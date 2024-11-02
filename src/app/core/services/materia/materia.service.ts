import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MateriaInterface,
  MateriaResponseInterface,
} from '../../../shared/interfaces/materia.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {
  private url = '/api/materias';

  constructor(private httpClient: HttpClient) {}

  getMaterias() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<Array<MateriaResponseInterface>>(
      `${this.url}/buscar`,
      { headers }
    );
  }

  getMateriaById(id: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<MateriaResponseInterface>(
      `${this.url}/buscar/${id}`,
      { headers }
    );
  }

  getNomeMateriaById(id: string): Observable<string | null> {
    return this.getMateriaById(id).pipe(
      map((materia: MateriaResponseInterface | undefined) => {
        return materia ? materia.nome : null;
      })
    );
  }
}
