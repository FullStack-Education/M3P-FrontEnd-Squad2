import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../core/services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginFormModel = {
    email: '',
    senha: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    if (this.loginFormModel.email == '' || this.loginFormModel.senha == '') {
      alert('Todos os campos precisam ser preenchidos');
    } else {
      this.loginService.login(this.loginFormModel);
    }
  }

  criarConta() {
    alert('Funcionalidade em construção');
  }
  esqueciSenha() {
    alert('Funcionalidade em construção');
  }
}
