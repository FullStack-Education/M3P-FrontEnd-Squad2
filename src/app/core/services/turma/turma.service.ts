import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurmaInterface } from '../../../shared/interfaces/turma.interface';
import { map } from 'rxjs';
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TurmaService {
 
  url = `${environment.apiUrl}/turmas`

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

  putTurma(usuario: TurmaInterface) {
    return this.httpClient.put<any>(this.url + `/${usuario.id}`, usuario);
  }

  deleteTurma(id: string) {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }

  verificarDocenteEmTurmas(docenteId: string) {
    return this.httpClient
      .get<Array<TurmaInterface>>(this.url)
      .pipe(
        map((turmas) => turmas.some((turma) => turma.docente === docenteId))
      );
  }
}
