import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocenteInterface} from '../../../shared/interfaces/docente.interface';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DocenteService {
 
  private url = '/api/docentes';

  constructor(private httpClient: HttpClient) {}

  // novo metodo de busca por docentes usando a API spring
  getDocentes(): Observable<DocenteInterface[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.httpClient.get<DocenteInterface[]>(`${this.url}/buscar`, { headers });
  }

  //metodo para saber o id de docente do usuario logado 
  // pelo seu id de usuario
  getIdDocentePeloIdUser(userId: string): Observable<string | null> {
    return this.getDocentes().pipe(
      map(docentes => {
        const docente = docentes.find(d => d.usuario.id === userId);
        return docente ? docente.id : null;
      })  
    );
  } 
  
  getNomePeloUserId(userId: string): Observable<string | null> {
    return this.getDocentes().pipe(
      map(docentes => {
        const docente = docentes.find(docente => docente.usuario.id.toString() === userId.toString());
        return docente ? docente.nome : null;
      })
    );
  }

  
// metodos antigos, a serem atualizados:
  getDocenteById(id: string) {
    return this.httpClient.get<DocenteInterface>(this.url + `/${id}`);
  }

  postDocente(usuario: DocenteInterface) {
    return this.httpClient.post<any>(this.url, usuario);
  }

  putDocente(usuario: DocenteInterface) {
    return this.httpClient.put<any>(this.url + `/${usuario.id}`, usuario);
  }

  deleteDocente(id: string) {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }

  getMateriasDocente(id: string) {
    return this.httpClient
      .get<DocenteInterface>(`${this.url}/${id}`)
      .pipe(map((docente) => docente.materias));
  }

  getNomeDocente(id: string){
    return this.getDocenteById(id).pipe(
      map(usuario => usuario.nome) 
    );
  }
}
