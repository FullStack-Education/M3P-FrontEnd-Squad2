import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UsuarioInterface } from '../../../shared/interfaces/usuario.interface';
import { DocenteService } from '../docente/docente.service';
import { AlunoService } from '../aluno/aluno.service';


@Injectable({
  providedIn: 'root',
})
export class LoginService {


  private url = '/api/login';

  constructor(private httpClient: HttpClient, private router: Router, private docenteService: DocenteService, private alunoService: AlunoService) {}

  login(dadosLogin: {
    email: string;
    senha: string;
  }): Observable<{ token: string; tempoExpiracao: number }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient
      .post<{ token: string; tempoExpiracao: number }>(this.url, dadosLogin, {
        headers,
      })
      .pipe(
        map((response) => {
       
          const token = response.token;
          if (token) {
            sessionStorage.setItem('token', token);

            const decodedToken: any = this.decodeToken(token);

            const scope = decodedToken.scope;
            const startIndex = scope.indexOf('nome=') + 5;
            const endIndex = scope.indexOf(')', startIndex);
            const nome = scope.substring(startIndex, endIndex);

            const userId = decodedToken.userId;

            sessionStorage.setItem('userId', userId.toString());
            sessionStorage.setItem('perfil', nome);

            this.router.navigate(['/inicio']);
            
          }
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          alert('Login falhou. Verifique seu e-mail e senha.');
          return throwError(() => new Error('Login failed'));
        })
      );
  }


  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('perfil');
    this.router.navigate(['/login']);
  }

  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }


  getIdUsuarioLogado(): string | null {
    return sessionStorage.getItem('userId');
  }

  getPerfilUsuarioLogado(): string | null {
    return sessionStorage.getItem('perfil');
  }


  // metodo usado no toolbar para buscar o nome do usuario logado
  /*
  getNomeUsuarioLogadoPeloUserId(userId: string): Observable<string | null>{
    if(this.getPerfilUsuarioLogado() === "aluno"){
      return this.alunoService.getAlunos().pipe(
        map(alunos => {
          const aluno = alunos.find(aluno => aluno.usuario.id.toString() === userId.toString());
          return aluno? aluno.nome : null;
        })
      )
    } else {
      return this.docenteService.getDocentes().pipe(
        map(docentes => {
          const docente = docentes.find(docente => docente.usuario.id.toString() === userId.toString());
          return docente? docente.nome : null;
        })
      )
    }
  }

*/

getNomeUsuarioLogadoPeloUserId(userId: string): Observable<string | null> {
  if (this.getPerfilUsuarioLogado() === "aluno") {
    return this.alunoService.getNomePeloUserId(userId);
  } else {
    return this.docenteService.getNomePeloUserId(userId);
  }
}






}
