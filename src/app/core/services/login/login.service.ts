import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  login(usuario : {email: string, senha: string}){
    this.usuarioService.getUsuarioByEmail(usuario.email).subscribe((retorno)=> {
      if(retorno){
        if(retorno.senha === usuario.senha){
          sessionStorage.setItem('idUsuarioLogado', retorno.id);
          sessionStorage.setItem('perfilUsuarioLogado', retorno.perfil);
          this.router.navigate(['/inicio']);
        } else {
          alert("Email e/ou senha incorretos")
        }
      } else {
        alert("Email e/ou senha incorretos")
      }
    })
  }

  logout(){
    sessionStorage.removeItem('idUsuarioLogado');
    sessionStorage.removeItem('perfilUsuarioLogado');
    this.router.navigate(['/login']);
  }

}
