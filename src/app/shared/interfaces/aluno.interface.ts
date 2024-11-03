import { TurmaInterface, TurmaInterfaceRequest, TurmaInterfaceRespose } from "./turma.interface";
import { UsuarioInterface, UsuarioInterfaceRequest, UsuarioInterfaceResponse } from "./usuarios.interface";



export interface AlunoInterface {
  id: string;
  nome: string;
  perfil: string
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
  usuario: UsuarioInterface;
}

export interface InformacaoAluno {
  nome: string;
  email: string;
  genero: string;
  telefone: string;
  cpf: string;
}

export interface AlunoInterfaceRequest {
  nome: string;
  perfil: string
  telefone: string;
  genero: string;
  turma: TurmaInterfaceRequest;
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
  usuario: UsuarioInterfaceRequest;
}

export interface AlunoInterfaceResponse {
  id: number;
  nome: string;
  perfil: string
  telefone: string;
  genero: string;
  turma: TurmaInterfaceRespose;
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
  usuario: UsuarioInterfaceResponse;
}      