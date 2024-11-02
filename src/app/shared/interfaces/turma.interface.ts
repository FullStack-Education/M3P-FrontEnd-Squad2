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

export interface TurmaInterfaceRespose{
  id: number;
  nome: string;
  dataInicio: string;
  dataTermino: string;
  horario: string;
  docenteId: number;
  cursoId: number;
}

export interface TurmaInterfaceRequest{
  nome: string;
  dataInicio: string;
  dataTermino: string;
  horario: string;
  docenteId: number;
  cursoId: number;
}