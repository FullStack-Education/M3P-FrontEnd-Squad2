import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CursoRequestInterface,
  CursoResponseInterface,
} from '../../../shared/interfaces/curso.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private url = '/api/cursos';

  constructor(private httpClient: HttpClient) {}

  getCursos() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<Array<CursoResponseInterface>>(
      `${this.url}/buscar`,
      { headers }
    );
  }

  getCursoById(id: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<CursoResponseInterface>(
      `${this.url}/buscar/${id}`,
      { headers }
    );
  }

  postCurso(usuario: CursoRequestInterface) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post<CursoResponseInterface>(
      `${this.url}/criar`,
      usuario,
      { headers }
    );
  }

  putCurso(usuario: CursoRequestInterface, id: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.put<any>(`${this.url}/atualizar/${id}`, usuario, {
      headers,
    });
  }

  deleteCurso(id: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.delete<any>(`${this.url}/deletar/${id}`, {
      headers,
    });
  }

  getNomeCursoById(id: string): Observable<string | null> {
    return this.getCursoById(id).pipe(
      map((curso: CursoResponseInterface | undefined) => {
        return curso ? curso.nome : null;
      })
    );
  }
}
