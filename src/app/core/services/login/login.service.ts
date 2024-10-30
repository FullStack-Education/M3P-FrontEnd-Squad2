import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UsuarioInterface } from '../../../shared/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {


  private url = '/api/login';

  constructor(private httpClient: HttpClient, private router: Router) {}

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

            sessionStorage.setItem('userId', userId);
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

  getUsuarioLogadoById(id: string) {
    return this.httpClient.get<UsuarioInterface>(this.url + `/${id}`);
  }

  
  getUsuarioLogadoByEmail(email: string) {
    return this.httpClient
      .get<Array<UsuarioInterface>>(this.url, {
        params: {
          email: email,
        },
      })
      .pipe(
        map((usuarios) => usuarios.find((usuario) => usuario.email === email))
      );
  }
  

  getIdUsuarioLogado(): string | null {
    return sessionStorage.getItem('id');
  }

  getNomeUsuarioLogado(id: string): Observable<string> {
    return this.getUsuarioLogadoById(id).pipe(map((usuario) => usuario.nome));
  }
}
