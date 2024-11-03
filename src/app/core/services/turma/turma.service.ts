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
    return this.httpClient.get<TurmaInterface>(this.url + `/${id}`);
  }

  postTurma(usuario: TurmaInterface) {
    return this.httpClient.post<any>(this.url, usuario);
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
