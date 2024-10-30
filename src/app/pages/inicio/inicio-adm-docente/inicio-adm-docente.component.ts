import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../../core/services/aluno/aluno.service';
import { FormsModule } from '@angular/forms';
import { IdadePipe } from '../../../core/pipes/idade/idade.pipe';
import { TelefonePipe } from '../../../core/pipes/telefone/telefone.pipe';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';


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
      quantidade: 0,
      entidade: 'Alunos',
    },
    {
      quantidade: 0,
      entidade: 'Docentes',
    },
    {
      quantidade: 0,
      entidade: 'Turmas',
    },
  ];

  constructor(
    private alunoService: AlunoService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.perfilUsuario = sessionStorage.getItem('perfil');
    this.buscarDadosAlunos();
    this.buscarDadosDashboard();
  }

  buscarDadosAlunos() {
    this.alunoService.getAlunos().subscribe((retorno) => {
      retorno.forEach((usuario) => {
        if (usuario) {
          this.listagemUsuarios.push({
            imagem: '/assets/imagem/icone-user-foto.png',
            nome: usuario.nome,
            idade: usuario.dataNascimento,
            email: usuario.usuario.email,
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

  
  buscarDadosDashboard(){
    this.dashboardService.getDashboard().subscribe((retorno) => {
      this.dadosEstatisticos[0].quantidade = retorno.totalAlunos;
      this.dadosEstatisticos[1].quantidade = retorno.totalDocentes;
      this.dadosEstatisticos[2].quantidade = retorno.totalTurmas;
    })
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
