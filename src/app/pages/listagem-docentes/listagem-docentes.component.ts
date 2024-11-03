import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocenteService } from '../../core/services/docente/docente.service';

@Component({
  selector: 'app-listagem-docentes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './listagem-docentes.component.html',
  styleUrl: './listagem-docentes.component.scss',
})
export class ListagemDocentesComponent implements OnInit {
  constructor(private docenteService: DocenteService) {}

  textoPesquisa!: string;

  listagemUsuarios: Array<{
    id: string;
    nome: string;
    telefone: string;
    acao: string;
  }> = [];

  listagemUsuariosPesquisa: Array<{
    id: string;
    nome: string;
    telefone: string;
    acao: string;
  }> = [];

  ngOnInit(): void {
    this.docenteService.getDocentes().subscribe((retorno) => {
      retorno.forEach((usuario) => {
        if (usuario) {
          this.listagemUsuarios.push({
            id: usuario.id,
            nome: usuario.nome,
            telefone: usuario.telefone,
            acao: `cadastro-docente/${usuario.id}`,
          });
        }
      });
    });

    this.listagemUsuariosPesquisa = this.listagemUsuarios;
  }

  pesquisar() {
    if (this.textoPesquisa) {
      this.listagemUsuariosPesquisa = this.listagemUsuarios.filter((usuario) => {
        const nome = usuario.nome.toUpperCase();
        const id = String(usuario.id).toUpperCase(); 
        return nome.includes(this.textoPesquisa.toUpperCase()) || id.includes(this.textoPesquisa.toUpperCase());
      });
    } else {
      this.listagemUsuariosPesquisa = this.listagemUsuarios;
    }
  }
}
