import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio/inicio.component';
import { CadastroDocenteComponent } from './pages/cadastroDocente/cadastro-docente/cadastro-docente.component';
import { CadastroTurmaComponent } from './pages/cadastro-turma/cadastro-turma.component';
import { CadastroAlunoComponent } from './pages/cadastro-aluno/cadastro-aluno.component';
import { CadastroNotaComponent } from './pages/cadastro-nota/cadastro-nota.component';
import { ListagemDocentesComponent } from './pages/listagem-docentes/listagem-docentes.component';
import { NotasAlunoComponent } from './pages/notas-aluno/notas-aluno.component';
import { usuarioLogadoGuard } from './core/guards/usuario-logado.guard';
import { TesteComponent } from './pages/teste/teste.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'cadastro-docente',
    component: CadastroDocenteComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'cadastro-docente/:id',
    component: CadastroDocenteComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'cadastro-turma',
    component: CadastroTurmaComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'cadastro-aluno',
    component: CadastroAlunoComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'cadastro-aluno/:id',
    component: CadastroAlunoComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'cadastro-nota',
    component: CadastroNotaComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'listagem-docentes',
    component: ListagemDocentesComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'notas',
    component: NotasAlunoComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'teste',
    component: TesteComponent,
  },
];
