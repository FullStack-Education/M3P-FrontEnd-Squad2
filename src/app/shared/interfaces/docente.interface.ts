import { MateriaInterface } from './materia.interface';
import { UsuarioLogadoInterface } from './usuarioLogado.interface';

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
  usuario: UsuarioLogadoInterface; 
  materias: MateriaInterface[]; 
}