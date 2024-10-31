import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocenteInterface, DocenteRequestInterface, DocenteResponseInterface} from '../../../shared/interfaces/docente.interface';
import { map, Observable } from 'rxjs';
import { MateriaInterface } from '../../../shared/interfaces/materia.interface';


@Injectable({
  providedIn: 'root',
})
export class DocenteService {
 
  private url = '/api/docentes';

  constructor(private httpClient: HttpClient) {}

  getDocentes(): Observable<DocenteResponseInterface[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    return this.httpClient.get<DocenteResponseInterface[]>(`${this.url}/buscar`, { headers });
  }

  getDocenteByUserId(userId: string): Observable<string | null> {
    return this.getDocentes().pipe(
      map(docentes => {
        const docente = docentes.find(d => d.usuario.id.toString() === userId.toString());
        return docente ? docente.id : null;
      })  
    );
  } 
  
  getDocenteNomeByUserId(userId: string): Observable<string | null> {
    return this.getDocentes().pipe(
      map(docentes => {
        const docente = docentes.find(docente => docente.usuario.id.toString() === userId.toString());
        return docente ? docente.nome : null;
      })
    );
  }

  getDocenteById(id: string): Observable<DocenteResponseInterface> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<DocenteResponseInterface>(`${this.url}/buscar/${id}`, { headers });
  }

  postDocente(usuario: DocenteRequestInterface) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post<DocenteResponseInterface>(`${this.url}/criar`, usuario, { headers });
  }

  putDocente(usuario: DocenteRequestInterface, id: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.put<any>(`${this.url}/atualizar/${id}`, usuario, { headers });
  }

  deleteDocente(id: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.httpClient.delete<any>(`${this.url}/deletar/${id}`, { headers });
  }

  getMateriasByDocenteId(id: string) : Observable<MateriaInterface[]> {

    return this.getDocenteById(id)
      .pipe(
        map((docente) => docente.materias)
      );
  }

  getNomeDocenteById(id: string){

    return this.getDocenteById(id)
    .pipe(
      map(usuario => usuario.nome) 
    );
  }
}
