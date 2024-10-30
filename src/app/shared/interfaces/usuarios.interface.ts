export interface UsuarioInterface {
  id: string;
  perfil: string
  email: string;
}

export interface UsuarioInterfaceRequest {
  email: string; 
  senha: string; 
  perfil: string; 
}

export interface UsuarioInterfaceResponse {
  id: number;   
  email: string; 
  perfil: string;
}