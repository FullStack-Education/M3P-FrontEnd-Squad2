import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurmaInterface } from '../../../shared/interfaces/turma.interface';
import { map } from 'rxjs';
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TurmaService {
  private url = '/api/turmas';

  constructor(private httpClient: HttpClient) {}

  getTurmas() {
    return this.httpClient.get<Array<TurmaInterface>>(this.url);
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
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient
      .get<Array<TurmaInterface>>(`${this.url}/buscar`, { headers })
      .pipe(
        map((turmas) => turmas.some((turma) => turma.docente === docenteId))
      );
  }
}
