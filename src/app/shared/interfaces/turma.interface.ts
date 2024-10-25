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