import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocenteInterface } from '../../../shared/interfaces/docente.interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
 
  url = `${environment.apiUrl}/usuarios`;

  constructor(private httpClient: HttpClient) {}

  getDocentes(): Observable<DocenteInterface[]> {
    return this.httpClient
      .get<DocenteInterface[]>(this.url)
      .pipe(
        map((docentes) =>
          docentes.filter((docente) => docente.perfil === 'docente')
        )
      );
  }

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
