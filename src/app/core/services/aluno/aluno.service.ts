import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AlunoInterface } from '../../../shared/interfaces/aluno.interface';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  
  private url = '/api/alunos';

  constructor(private httpClient: HttpClient) { }

  getAlunos(): Observable<AlunoInterface[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.httpClient.get<AlunoInterface[]>(`${this.url}/buscar`, { headers });
  }

  getAlunoById(id: string): Observable<AlunoInterface> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.httpClient.get<AlunoInterface>(`${this.url}/buscar/${id}`, { headers });
  }

  postAluno(aluno: AlunoInterface): Observable<AlunoInterface> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<AlunoInterface>(`${this.url}/criar`, aluno, { headers });
  }

  putAluno(id: string, aluno: AlunoInterface): Observable<AlunoInterface> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.httpClient.put<AlunoInterface>(`${this.url}/atualizar/${id}`, aluno, { headers });
  }

  deleteAluno(id: string): Observable<void> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.delete<void>(`${this.url}/deletar/${id}`, { headers });
  }

  // metodo para buscar o nome do aluno logado pelo seu userId


  getNomePeloUserId(userId: string): Observable<string | null> {
    return this.getAlunos().pipe(
      map(alunos => {
        const aluno = alunos.find(aluno => aluno.usuario.id.toString() === userId.toString());
        return aluno ? aluno.nome : null;
      })
    );
  }
  

// metodos abaixo quando usava json server, atualizar quando necessário
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
