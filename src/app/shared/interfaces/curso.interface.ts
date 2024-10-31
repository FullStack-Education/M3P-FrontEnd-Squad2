import { MateriaResponseInterface } from "./materia.interface";

export interface CursoResponseInterface {
  id: string;
  nome: string;
  duracao: string;
  materias: MateriaResponseInterface[];
}

export interface CursoRequestInterface {
  nome: string;
  duracao: string;
}