import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlunoService } from '../../../core/services/aluno/aluno.service';
import { MateriaService } from '../../../core/services/materia/materia.service';
import { CursoService } from '../../../core/services/curso/curso.service';

@Component({
  selector: 'app-inicio-aluno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio-aluno.component.html',
  styleUrl: './inicio-aluno.component.scss',
})
export class InicioAlunoComponent implements OnInit {
  id: string | null = null;
  idAluno: string | null = null;

  dadosMinhasAvaliacoes: Array<{
    nomeAvaliacao: string;
    nomeMateria: string;
    data: string;
    acao: string;
  }> = [];

  meuCurso: string | null = null;
  listaCursosExtras: Array<{ nomeCurso: string }> = [];

  constructor(
    private alunoService: AlunoService,
    private materiaService: MateriaService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.id = sessionStorage.getItem('userId');
    if (this.id) {
      this.alunoService.getIdAlunoByUserId(this.id).subscribe((idAluno) => {
        this.idAluno = idAluno || '';
        this.buscarDadosAvaliacoes(this.idAluno);
        this.buscarCursoAluno(this.idAluno);
      });
    }
  }

  buscarDadosAvaliacoes(idAluno: string) {
    this.alunoService.getNotasAluno(idAluno).subscribe((retorno) => {
      this.dadosMinhasAvaliacoes = [];

      retorno.forEach((usuario) => {
        this.materiaService
          .getNomeMateriaById(usuario.materiaId.toString())
          .subscribe((nomeMateria) => {
            this.dadosMinhasAvaliacoes.push({
              nomeAvaliacao: usuario.nome,
              nomeMateria: nomeMateria || 'Matéria não encontrada',
              data: usuario.dataAvaliacao,
              acao: '/notas',
            });

            if (this.dadosMinhasAvaliacoes.length === retorno.length) {
              this.dadosMinhasAvaliacoes.sort(
                (a, b) =>
                  new Date(b.data).getTime() - new Date(a.data).getTime()
              );
              this.dadosMinhasAvaliacoes = this.dadosMinhasAvaliacoes.slice(
                0,
                3
              );
            }
          });
      });
    });
  }

  buscarCursoAluno(idAluno: string) {
    this.alunoService.getAlunoById(idAluno).subscribe((aluno) => {
      const cursoId = aluno.turma.cursoId;
      this.cursoService
        .getNomeCursoById(cursoId.toString())
        .subscribe((nomeCurso) => {
          this.meuCurso = nomeCurso;
          this.buscarCursosExtras(cursoId.toString());
        });
    });
  }

  buscarCursosExtras(excluirCursoId: string) {
    this.cursoService.getCursos().subscribe((cursos) => {
      this.listaCursosExtras = cursos
        .filter((curso) => curso.id.toString() !== excluirCursoId)
        .map((curso) => ({ nomeCurso: curso.nome }));
    });
  }
}
