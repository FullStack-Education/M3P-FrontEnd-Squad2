import { MateriaInterface } from './materia.interface';

export interface DocenteInterface {
  id: string;
  nome: string;
  perfil: string;
  email: string;
  senha: string;
  telefone: string;
  genero: string;
  estadoCivil: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  naturalidade: string;
  materias: MateriaInterface[];
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  referencia: string;
}
