import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InicioAdmDocenteComponent } from '../inicio-adm-docente/inicio-adm-docente.component';
import { InicioAlunoComponent } from '../inicio-aluno/inicio-aluno.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, InicioAdmDocenteComponent, InicioAlunoComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent implements OnInit {
  perfilUsuario: string | null = null;

  ngOnInit(): void {
    this.perfilUsuario = sessionStorage.getItem('perfil');
  }
}
