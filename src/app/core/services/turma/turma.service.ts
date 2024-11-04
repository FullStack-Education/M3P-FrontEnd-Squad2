import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  TurmaInterface,
  TurmaInterfaceRequest,
  TurmaInterfaceResponse,
  
} from '../../../shared/interfaces/turma.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TurmaService {
  private url = '/api/turmas';

  constructor(private httpClient: HttpClient) {}

  getTurmas(): Observable<TurmaInterfaceResponse[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<TurmaInterfaceResponse[]>(`${this.url}/buscar`, {
      headers,
    });
  }

  getTurmaById(id: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<TurmaInterfaceResponse>(
      `${this.url}/buscar/${id}`,
      { headers }
    );
  }

  postTurma(usuario: TurmaInterfaceRequest) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post<TurmaInterfaceRequest>(
      `${this.url}/criar`,
      usuario,
      { headers }
    );
  }

  verificarDocenteEmTurmas(docenteId: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .get<Array<TurmaInterface>>(`${this.url}/buscar`, { headers })
      .pipe(
        map((turmas) => turmas.some((turma) => turma.docente === docenteId))
      );
  }

  
}
