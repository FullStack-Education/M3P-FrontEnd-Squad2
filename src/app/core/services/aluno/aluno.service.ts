import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AlunoInterface } from '../../../shared/interfaces/aluno.interface';
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  
  url = `${environment.apiUrl}/usuarios`

  private url2 = '/api/alunos';

  constructor(private httpClient: HttpClient) { }

  getAlunos(): Observable<AlunoInterface[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.httpClient.get<AlunoInterface[]>(`${this.url}/buscar`, { headers });
  }


  getAlunos1(): Observable<AlunoInterface[]> {
    return this.httpClient.get<AlunoInterface[]>(this.url).pipe(
      map(aluno => aluno.filter(aluno => aluno.perfil === 'aluno'))
    );
  }

  getAlunoById(id: string){
    return this.httpClient.get<AlunoInterface>(this.url + `/${id}`);
  }

  postAluno(usuario : AlunoInterface){
    return this.httpClient.post<any>(this.url, usuario);
  }
  
  putAluno(usuario : AlunoInterface){
    return this.httpClient.put<any>(this.url + `/${usuario.id}`, usuario);
  }
  
  deleteAluno(id: string){
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }

  getDocentesIdsDoAluno(idAluno: string){
    return this.httpClient.get<AlunoInterface>(`${this.url}/${idAluno}`).pipe(
      map(aluno => aluno.turma.map(turma => turma.docente))
    );
  }

  alunoMatriculadoEmTurmas(idAluno: string){
    return this.httpClient.get<AlunoInterface>(`${this.url}/${idAluno}`).pipe(
      map(aluno => aluno.turma.length > 0)
    );
  }
}
