import { Component, OnInit } from '@angular/core';
import { InformacaoAluno } from '../../shared/interfaces/aluno.interface';
import { InformacaoTurma } from '../../shared/interfaces/turma.interface';
import { AlunoService } from '../../core/services/aluno/aluno.service';
import { CommonModule } from '@angular/common';
import { DocenteService } from '../../core/services/docente/docente.service';
import { TelefonePipe } from '../../core/pipes/telefone/telefone.pipe';
import { MateriaService } from '../../core/services/materia/materia.service';

@Component({
  selector: 'app-notas-aluno',
  standalone: true,
  imports: [CommonModule, TelefonePipe],
  templateUrl: './notas-aluno.component.html',
  styleUrl: './notas-aluno.component.scss',
})
export class NotasAlunoComponent implements OnInit {
  idAluno!: string | null;

  id: string | null = null;

  informacaoAluno: InformacaoAluno = {
    nome: '',
    email: '',
    genero: '',
    telefone: '',
    cpf: '',
  };

  informacaoTurma: InformacaoTurma = {
    docente: '',
    nomeTurma: '',
    horario: '',
  };

  listagemNota: Array<{
    id: string;
    nomeAvaliacao: string;
    data: string;
    nomeMateria: string;
    valorNota: number;
  }> = [];

  constructor(
    private alunoService: AlunoService,
    private docenteService: DocenteService,
    private materiaService: MateriaService
  ) {}

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId');
    if (this.id) {
      this.alunoService.getIdAlunoByUserId(this.id).subscribe((idAluno) => {
        this.idAluno = idAluno || '';
        this.buscarInformacoesAluno(this.idAluno);
        this.buscarDadosAvaliacoes(this.idAluno);
      });
    }
  }

  buscarInformacoesAluno(idAluno: string) {
    this.alunoService.getAlunoById(idAluno).subscribe((retorno) => {
      if (retorno) {
        this.informacaoAluno = {
          nome: retorno.nome,
          email: retorno.usuario.email,
          genero: retorno.genero,
          telefone: retorno.telefone,
          cpf: retorno.cpf,
        };
        this.docenteService
          .getNomeDocenteById(retorno.turma.docenteId.toString())
          .subscribe((nomeDocente) => {
            this.informacaoTurma = {
              docente: nomeDocente || '',
              nomeTurma: retorno.turma.nome,
              horario: retorno.turma.horario,
            };
          });
      }
    });
  }

  buscarDadosAvaliacoes(idAluno: string) {
    this.alunoService.getNotasAluno(idAluno).subscribe((retorno) => {
      this.listagemNota = []; 
      retorno.forEach((nota) => {
        this.materiaService
          .getNomeMateriaById(nota.materiaId.toString())
          .subscribe((nomeMateria) => {
            this.listagemNota.push({
              id: nota.id.toString(),
              nomeAvaliacao: nota.nome,
              nomeMateria: nomeMateria || 'Matéria não encontrada',
              data: nota.dataAvaliacao,
              valorNota: nota.valor,
            });

            if (this.listagemNota.length === retorno.length) {
              this.listagemNota.sort(
                (a, b) =>
                  new Date(a.data).getTime() - new Date(b.data).getTime()
              );
            }
          });
      });
    });
  }
}
