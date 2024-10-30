import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './shared/components/menuLateral/menu-lateral/menu-lateral.component';
import { LoginService } from './core/services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, CommonModule, MenuLateralComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'labpcp-angular';


  mostrarContainer = true;
  toolbarDados = {
    titulo: '',
    nomeUsuario: '',
  };

  constructor(private router: Router,  private loginService: LoginService) {}

  ngOnInit() {
    this.router.events.subscribe((retorno) => {
      if (retorno instanceof NavigationEnd) {
        this.mostrarContainer = !this.router.url.includes('login');
        this.toolbarTitulo(this.router.url);
        this.buscaNomeUsuario();
      }
    });
  }

  
  private buscaNomeUsuario() {
    const idUsuario = this.loginService.getIdUsuarioLogado();
    if (idUsuario) {
      this.loginService.getNomeUsuarioLogadoPeloUserId(idUsuario).subscribe((nome) => {
        this.toolbarDados.nomeUsuario = nome ?? 'Usuário';  
      });
    }
  }
  

  private toolbarTitulo(url: string) {
    if (url.includes('cadastro-docente')) {
      this.toolbarDados.titulo = 'Cadastro de Docente';
    } else if (url.includes('cadastro-turma')) {
      this.toolbarDados.titulo = 'Cadastro de Turma';
    } else if (url.includes('cadastro-aluno')) {
      this.toolbarDados.titulo = 'Cadastro de Aluno';
    } else if (url.includes('cadastro-nota')) {
      this.toolbarDados.titulo = 'Cadastro de Nota';
    } else if (url.includes('listagem-docentes')) {
      this.toolbarDados.titulo = 'Listagem de Docentes';
    } else if (url.includes('notas')) {
      this.toolbarDados.titulo = 'Notas do Aluno';
    } else if (url.includes('inicio')) {
      this.toolbarDados.titulo = 'Dashboard';
    } else if (url.includes('notas')) {
      this.toolbarDados.titulo = 'Notas do Aluno';
    } else {
      this.toolbarDados.titulo = 'Página não encontrada';
    }
  }
}