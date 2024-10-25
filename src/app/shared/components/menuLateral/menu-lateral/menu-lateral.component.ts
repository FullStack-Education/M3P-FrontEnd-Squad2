import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../core/services/login/login.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss',
})
export class MenuLateralComponent implements OnInit {
  menuExpandido = true;
  perfilUsuario: string | null = null;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.perfilUsuario = sessionStorage.getItem('perfilUsuarioLogado');
  }

  menuexpandir() {
    this.menuExpandido = !this.menuExpandido;
  }

  botaoDeslogar() {
    this.loginService.logout();
  }
}
