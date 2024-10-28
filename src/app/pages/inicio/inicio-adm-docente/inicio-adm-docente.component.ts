import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../../core/services/turma/turma.service';
import { AlunoService } from '../../../core/services/aluno/aluno.service';
import { FormsModule } from '@angular/forms';
import { DocenteService } from '../../../core/services/docente/docente.service';
import { IdadePipe } from '../../../core/pipes/idade/idade.pipe';
import { TelefonePipe } from '../../../core/pipes/telefone/telefone.pipe';

@Component({
  selector: 'app-inicio-adm-docente',
  standalone: true,
  imports: [FormsModule, CommonModule, IdadePipe, TelefonePipe],
  templateUrl: './inicio-adm-docente.component.html',
  styleUrl: './inicio-adm-docente.component.scss',
})
export class InicioAdmDocenteComponent implements OnInit {
  perfilUsuario: string | null = null;

  textoPesquisa!: string;

  listagemUsuarios: Array<{
    imagem: string;
    nome: string;
    idade: string;
    email: string;
    telefone: string;
    acao: string;
  }> = [];

  listagemUsuariosPesquisa: Array<{
    imagem: string;
    nome: string;
    idade: string;
    email: string;
    telefone: string;
    acao: string;
  }> = [];

  dadosEstatisticos = [
    {
      quantidade: '0',
      entidade: 'Alunos',
    },
    {
      quantidade: '0',
      entidade: 'Docentes',
    },
    {
      quantidade: '0',
      entidade: 'Turmas',
    },
  ];

  constructor(
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.perfilUsuario = sessionStorage.getItem('userId');
    this.buscarQuantidadeAlunos();
    this.buscarQuantidadeDocentes();
    this.buscarQuantidadeTurmas();
    this.buscarDadosAlunos();
  }

  buscarDadosAlunos() {
    this.alunoService.getAlunos().subscribe((retorno) => {
      retorno.forEach((usuario) => {
        if (usuario) {
          this.listagemUsuarios.push({
            imagem: '/assets/imagem/icone-user-foto.png',
            nome: usuario.nome,
            idade: usuario.dataNascimento,
            email: usuario.email,
            telefone: usuario.telefone,
            acao:
              this.perfilUsuario === 'administrador'
                ? `cadastro-aluno/${usuario.id}`
                : 'cadastro-nota',
          });
        }
      });
    });

    this.listagemUsuariosPesquisa = this.listagemUsuarios;
  }

  buscarQuantidadeAlunos() {
    this.alunoService.getAlunos().subscribe((alunos) => {
      this.dadosEstatisticos[0].quantidade = alunos.length.toString();
    });
  }

  buscarQuantidadeDocentes() {
    this.docenteService.getDocentes().subscribe((docentes) => {
      this.dadosEstatisticos[1].quantidade = docentes.length.toString();
    });
  }

  buscarQuantidadeTurmas() {
    this.turmaService.getTurmas().subscribe((turmas) => {
      this.dadosEstatisticos[2].quantidade = turmas.length.toString();
    });
  }

  pesquisar() {
    if (this.textoPesquisa) {
      this.listagemUsuariosPesquisa = this.listagemUsuarios.filter(
        (usuario) =>
          usuario.nome
            ?.toUpperCase()
            .includes(this.textoPesquisa!.toUpperCase()) ||
          usuario.email
            ?.toUpperCase()
            .includes(this.textoPesquisa!.toUpperCase()) ||
          usuario.telefone?.includes(this.textoPesquisa!)
      );
    } else {
      this.listagemUsuariosPesquisa = this.listagemUsuarios;
    }
  }
}
