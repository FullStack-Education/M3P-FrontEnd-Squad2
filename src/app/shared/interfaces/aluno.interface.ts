import { TurmaInterface } from "./turma.interface";

export interface AlunoInterface {
  id: string;
  nome: string;
  perfil: string
  email: string;
  senha: string;
  telefone: string;
  genero: string;
  turma: TurmaInterface[];
  dataNascimento: string;
  cpf: string;
  rg: string;
  naturalidade: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  referencia: string;
}

export interface InformacaoAluno {
  nome: string;
  email: string;
  genero: string;
  telefone: string;
  cpf: string;
}

