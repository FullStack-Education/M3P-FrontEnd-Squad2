import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AlunoInterface } from '../../../shared/interfaces/aluno.interface';
import { environment } from '../../../shared/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  
  url = `${environment.apiUrl}/usuarios`

  constructor(private httpClient: HttpClient) { }

  getAlunos(): Observable<AlunoInterface[]> {
    return this.httpClient.get<AlunoInterface[]>(this.url).pipe(
      map(aluno => aluno.filter(aluno => aluno.perfil === 'aluno'))
    );
  }

  getAlunoById(id: string){
    return this.httpClient.get<AlunoInterface>(this.url + `/${id}`);
  }

  postAluno(usuario : AlunoInterface){
    return this.httpClient.post<any>(this.url, usuario);
  }
  
  putAluno(usuario : AlunoInterface){
    return this.httpClient.put<any>(this.url + `/${usuario.id}`, usuario);
  }
  
  deleteAluno(id: string){
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }

  getDocentesIdsDoAluno(idAluno: string){
    return this.httpClient.get<AlunoInterface>(`${this.url}/${idAluno}`).pipe(
      map(aluno => aluno.turma.map(turma => turma.docente))
    );
  }

  alunoMatriculadoEmTurmas(idAluno: string){
    return this.httpClient.get<AlunoInterface>(`${this.url}/${idAluno}`).pipe(
      map(aluno => aluno.turma.length > 0)
    );
  }
}
