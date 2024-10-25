import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotaInterface } from '../../../shared/interfaces/nota.interface';
import { map } from 'rxjs';
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
 
  url = `${environment.apiUrl}/notas`

  constructor(private httpClient: HttpClient) {}

  getNotas() {
    return this.httpClient.get<Array<NotaInterface>>(this.url);
  }

  getNotaById(id: string) {
    return this.httpClient.get<NotaInterface>(this.url + `/${id}`);
  }

  getNotasByIdAluno(idAluno: string) {
    return this.httpClient.get<Array<NotaInterface>>(this.url, {
      params: {
        aluno: idAluno,
      },
    });
  }

  postNota(nota: NotaInterface) {
    return this.httpClient.post<any>(this.url, nota);
  }

  putNota(nota: NotaInterface) {
    return this.httpClient.put<any>(this.url + `/${nota.id}`, nota);
  }

  deleteNota(id: string) {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }

  verificarDocenteEmNotas(docenteId: string) {
    return this.httpClient
      .get<Array<NotaInterface>>(this.url)
      .pipe(map((notas) => notas.some((nota) => nota.docente === docenteId)));
  }

  verificarAlunoEmNotas(alunoId: string) {
    return this.httpClient
      .get<Array<NotaInterface>>(this.url)
      .pipe(map((notas) => notas.some((nota) => nota.aluno === alunoId)));
  }
}
