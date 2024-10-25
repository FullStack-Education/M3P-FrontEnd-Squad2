import { Component, OnInit } from '@angular/core';
import { InformacaoAluno } from '../../shared/interfaces/aluno.interface';
import { InformacaoTurma } from '../../shared/interfaces/turma.interface';
import { UsuarioService } from '../../core/services/usuario/usuario.service';
import { AlunoService } from '../../core/services/aluno/aluno.service';
import { NotaService } from '../../core/services/nota/nota.service';
import { CommonModule } from '@angular/common';
import { DocenteService } from '../../core/services/docente/docente.service';
import { TelefonePipe } from '../../core/pipes/telefone/telefone.pipe';

@Component({
  selector: 'app-notas-aluno',
  standalone: true,
  imports: [CommonModule, TelefonePipe],
  templateUrl: './notas-aluno.component.html',
  styleUrl: './notas-aluno.component.scss',
})
export class NotasAlunoComponent implements OnInit {
  idAluno!: string | null;

  informacaoAluno: InformacaoAluno = {
    nome: '',
    email: '',
    genero: '',
    telefone: '',
    cpf: '',
  };

  informacaoTurma: Array<InformacaoTurma> = [];

  listagemNota: Array<{
    id: string;
    nomeAvaliacao: string;
    data: string;
    nomeMateria: string;
    valorNota: number;
  }> = [];

  constructor(
    private usuarioService: UsuarioService,
    private alunoService: AlunoService,
    private notaService: NotaService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.idAluno = this.usuarioService.getIdUsuarioLogado();

    if (this.idAluno) {
      this.buscarAluno(this.idAluno);
      this.buscarNotas(this.idAluno);
    }
  }

  buscarAluno(id: string) {
    this.alunoService.getAlunoById(id).subscribe((retorno) => {
      if (retorno) {
        this.informacaoAluno = {
          nome: retorno.nome,
          email: retorno.email,
          genero: retorno.genero,
          telefone: retorno.telefone,
          cpf: retorno.cpf,
        };

        this.informacaoTurma = retorno.turma.map((turma) => ({
          docente: turma.docente,
          nomeTurma: turma.nomeTurma,
          horario: turma.horario,
        }));

        this.buscarNomesDocentes();
      }
    });
  }

  buscarNomesDocentes() {
    this.informacaoTurma.forEach((turma, index) => {
      this.docenteService.getNomeDocente(turma.docente).subscribe((nome) => {
        this.informacaoTurma[index].docente = nome;
      });
    });
  }

  buscarNotas(idAluno: string) {
    this.notaService.getNotasByIdAluno(idAluno).subscribe((retorno) => {
      retorno.forEach((nota) => {
        if (nota) {
          this.listagemNota.push({
            id: nota.id,
            nomeAvaliacao: nota.nomeAvaliacao,
            data: nota.dataAvaliacao,
            nomeMateria: nota.nomeMateria,
            valorNota: nota.valorNota,
          });
        }
      });
    });
  }
}
