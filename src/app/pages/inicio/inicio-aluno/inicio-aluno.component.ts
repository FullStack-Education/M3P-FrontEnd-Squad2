import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotaService } from '../../../core/services/nota/nota.service';
import { RouterModule } from '@angular/router';
import { AlunoService } from '../../../core/services/aluno/aluno.service';
import { DocenteService } from '../../../core/services/docente/docente.service';

@Component({
  selector: 'app-inicio-aluno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio-aluno.component.html',
  styleUrl: './inicio-aluno.component.scss',
})
export class InicioAlunoComponent implements OnInit {
  idUsuario: string | null = null;

  dadosMinhasAvaliacoes: Array<{
    nomeAvaliacao: string;
    nomeMateria: string;
    data: string;
    acao: string;
  }> = [];

  listaCursosExtras = [
    {
      nomeCurso: 'Curso Angular',
    },
    {
      nomeCurso: 'Curso Javascript',
    },
    {
      nomeCurso: 'Curso Java',
    },
  ];

  docentesIds: string[] = [];
  materiasDosDocentes: Array<{ nomeMateria: string }> = [];

  constructor(
    private notaService: NotaService,
    private alunoService: AlunoService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.idUsuario = sessionStorage.getItem('idUsuarioLogado');
    if (this.idUsuario) {
      this.buscarDadosAvaliacoes(this.idUsuario);
      this.buscarDocentesIds(this.idUsuario);
    }
  }
  

  buscarDadosAvaliacoes(id: string) {
    this.notaService.getNotasByIdAluno(id).subscribe((retorno) => {
      const ultimasAvaliacoes = retorno.slice(-3);
      this.dadosMinhasAvaliacoes = ultimasAvaliacoes.map((avaliacao) => ({
        nomeAvaliacao: avaliacao.nomeAvaliacao,
        nomeMateria: avaliacao.nomeMateria,
        data: avaliacao.dataAvaliacao,
        acao: '/notas',
      }));
    });
  }

  buscarDocentesIds(idAluno: string) {
    this.alunoService.getDocentesIdsDoAluno(idAluno).subscribe((docenteIds) => {
      this.docentesIds = docenteIds;
      this.buscarMateriasDosDocentes();
    });
  }

  buscarMateriasDosDocentes() {
    this.materiasDosDocentes = [];
    this.docentesIds.forEach((id) => {
      this.docenteService.getMateriasByDocenteId(id).subscribe((materias) => {
        materias.forEach((materia) => {
          this.materiasDosDocentes.push({ nomeMateria: materia.nomeMateria });
        });
      });
    });
  }
}
