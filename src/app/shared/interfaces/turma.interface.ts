import { CursoRequestInterface } from "./curso.interface";
import { DocenteResponseInterface } from "./docente.interface";

export interface TurmaInterface {
  id: string;
  nomeTurma: string;
  docente: string
  dataInicio: string;
  dataTermino: string;
  horario: string;
}

export interface InformacaoTurma{
  docente: string;
  nomeTurma: string;
  horario: string;
}

export interface TurmaRequestInterface {
  nome: string;
  docenteId: number;
  cursoId: number;
  dataInicio: string;
  dataTermino: string;
  horario: string;
}

export interface TurmaResponseInterface {
  id: string;
  nome: string;
  docenteId: number | DocenteResponseInterface;
  cursoId: number | CursoRequestInterface;
  dataInicio: string;
  dataTermino: string;
  horario: string;
}