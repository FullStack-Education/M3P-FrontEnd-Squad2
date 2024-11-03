export interface NotaInterface {
  id: string;
  aluno: string;
  docente: string;
  nomeMateria: string;
  nomeAvaliacao: string;
  dataAvaliacao: string;
  valorNota: number;
}


export interface NotaInterfaceResponse {
  id: number;
  nome: string;
  valor: number;
  dataAvaliacao: string;
  alunoId: number;
  docenteId: number;
  materiaId: number;
}