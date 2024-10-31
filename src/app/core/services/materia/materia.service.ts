import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MateriaInterface, MateriaResponseInterface } from '../../../shared/interfaces/materia.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private url = '/api/materias';
  

  constructor(private httpClient: HttpClient) { }

  getMaterias(){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<Array<MateriaResponseInterface>>(`${this.url}/buscar`, { headers }); 
  }

  getMateriaById(id: string){
    return this.httpClient.get<MateriaInterface>(this.url + `/${id}`);
  }
}
