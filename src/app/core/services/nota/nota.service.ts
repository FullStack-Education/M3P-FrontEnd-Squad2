import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotaInterface, NotaInterfaceRequest, NotaInterfaceResponse } from '../../../shared/interfaces/nota.interface';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class NotaService {

  private url = '/api/notas';

  constructor(private httpClient: HttpClient) {}

  getNotas(): Observable<NotaInterfaceResponse[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<NotaInterfaceResponse[]>(`${this.url}/buscar`, {
      headers,
    });
  }

  getNotasByIdAluno(idAluno: string) {
    return this.httpClient.get<Array<NotaInterface>>(this.url, {
      params: {
        aluno: idAluno,
      },
    });
  }

  postNota(nota: NotaInterfaceRequest) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<NotaInterfaceResponse>(`${this.url}/criar`, nota, { headers });
  }



  verificarDocenteEmNotas(docenteId: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient
      .get<Array<NotaInterface>>(`${this.url}/buscar`, { headers })
      .pipe(map((notas) => notas.some((nota) => nota.docente === docenteId)));
  }

  verificarAlunoEmNotas(alunoId: string) {
    return this.getNotas().pipe(
      map((notas) => notas.some((nota) => nota.alunoId.toString() === alunoId))
    );
  }

}
