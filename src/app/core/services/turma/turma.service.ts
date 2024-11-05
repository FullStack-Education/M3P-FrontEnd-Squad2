import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TurmaInterface, TurmaRequestInterface, TurmaResponseInterface } from '../../../shared/interfaces/turma.interface';
import { map } from 'rxjs';
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TurmaService {
  
  private url = '/api/turmas';

  constructor(private httpClient: HttpClient) {}

  getTurmas(){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<Array<TurmaResponseInterface>>(`${this.url}/buscar`, { headers }); 
  }

  getTurmaById(id: string){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<TurmaResponseInterface>(`${this.url}/buscar/${id}`, { headers });
  }

  postTurma(usuario: TurmaRequestInterface) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<TurmaResponseInterface>(`${this.url}/criar`, usuario, { headers });
  }

  putTurma(usuario: TurmaRequestInterface, id: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.put<any>(`${this.url}/atualizar/${id}`, usuario, { headers });
  }

  deleteTurma(id: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.httpClient.delete<any>(`${this.url}/deletar/${id}`, { headers });
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
