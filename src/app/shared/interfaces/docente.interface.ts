import { MateriaInterface } from './materia.interface';
import { UsuarioInterface, UsuarioInterfaceResponse } from './usuarios.interface';



export interface DocenteInterface {
  id: string; 
  nome: string;
  telefone: string;
  genero: string;
  estadoCivil: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  naturalidade: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  uf: string;
  referencia: string;
  usuario: UsuarioInterface; 
  materias: MateriaInterface[]; 
}

export interface DocenteRequestInterface {
  nome: string;
  telefone: string;
  genero: string;
  estadoCivil: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  naturalidade: string;
  cep: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  uf: string;
  referencia?: string;
  materiasIds: Number[]; 
  email?: string;
  senha?: string;
}

export interface DocenteResponseInterface {
  id: string; 
  nome: string;
  telefone: string;
  genero: string;
  estadoCivil: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  naturalidade: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  uf: string;
  referencia: string;
  usuario: UsuarioInterfaceResponse; 
  materias: MateriaInterface[]; 
}