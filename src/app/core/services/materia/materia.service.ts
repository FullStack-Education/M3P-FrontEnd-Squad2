import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MateriaInterface } from '../../../shared/interfaces/materia.interface';
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  url = `${environment.apiUrl}/materias`
  

  constructor(private httpClient: HttpClient) { }

  getMaterias(){
    return this.httpClient.get<Array<MateriaInterface>>(this.url); 
  }

  getMateriaById(id: string){
    return this.httpClient.get<MateriaInterface>(this.url + `/${id}`);
  }
}
