import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  AlunoInterface,
  AlunoInterfaceRequest,
  AlunoInterfaceResponse,
} from '../../../shared/interfaces/aluno.interface';
import { NotaInterfaceResponse } from '../../../shared/interfaces/nota.interface';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private url = '/api/alunos';

  constructor(private httpClient: HttpClient) {}

  getAlunos(): Observable<AlunoInterfaceResponse[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<AlunoInterfaceResponse[]>(`${this.url}/buscar`, {
      headers,
    });
  }

  getAlunoById(id: string): Observable<AlunoInterfaceResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<AlunoInterfaceResponse>(
      `${this.url}/buscar/${id}`,
      { headers }
    );
  }

  postAluno(aluno: AlunoInterfaceRequest): Observable<AlunoInterfaceResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient.post<AlunoInterfaceResponse>(
      `${this.url}/criar`,
      aluno,
      { headers }
    );
  }

  putAluno(
    id: string,
    aluno: AlunoInterfaceRequest
  ): Observable<AlunoInterfaceResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient.put<AlunoInterfaceResponse>(
      `${this.url}/atualizar/${id}`,
      aluno,
      { headers }
    );
  }

  deleteAluno(id: string): Observable<void> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.delete<void>(`${this.url}/deletar/${id}`, {
      headers,
    });
  }

  getNomePeloUserId(userId: string): Observable<string | null> {
    return this.getAlunos().pipe(
      map((alunos) => {
        const aluno = alunos.find(
          (aluno) => aluno.usuario.id.toString() === userId.toString()
        );
        return aluno ? aluno.nome : null;
      })
    );
  }

  getIdAlunoByUserId(userId: string): Observable<string | null> {
    return this.getAlunos().pipe(
      map((alunos) => {
        const aluno = alunos.find(
          (aluno) => aluno.usuario.id.toString() === userId.toString()
        );
        return aluno ? aluno.id.toString() : null;
      })
    );
  }

  getNotasAluno(id: string): Observable<NotaInterfaceResponse[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<NotaInterfaceResponse[]>(
      `${this.url}/${id}/notas`,
      { headers }
    );
  }

  // metodos antigos a serem atualizados quando necessário
  getDocentesIdsDoAluno(idAluno: string) {
    return this.httpClient
      .get<AlunoInterface>(`${this.url}/${idAluno}`)
      .pipe(map((aluno) => aluno.turma.map((turma) => turma.docente)));
  }

  alunoMatriculadoEmTurmas(idAluno: string) {
    return this.httpClient
      .get<AlunoInterface>(`${this.url}/${idAluno}`)
      .pipe(map((aluno) => aluno.turma.length > 0));
  }
}
