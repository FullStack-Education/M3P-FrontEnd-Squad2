# Sistema para Gestão de Projetos Educacionais - Frontend

Este projeto é uma aplicação frontend desenvolvida utilizando o framework Angular. Antes de rodar esta aplicação, é necessário que o backend esteja em funcionamento.

## Tecnologias Usadas

Angular, TypeScript, HTML e CSS.

## Pré-requisitos

Para que a aplicação funcione corretamente, o backend deve estar em funcionamento. Certifique-se de que o servidor da API esteja ativo antes de iniciar o frontend. O backend deve estar rodando na porta **8080** e você pode acessá-lo [neste link](https://github.com/FullStack-Education/M3P-BackEnd-Squad2).


## Executando a Aplicação

1. Navegue até a pasta do projeto frontend.
2. Execute o seguinte comando para iniciar a aplicação com configuração de proxy:

   ```bash
   ng serve --proxy-config proxy.conf.json

Isso irá gerar uma URL que levará à página de login.

## Usuários Pré-Cadastrados

A aplicação possui os seguintes usuários pré-cadastrados:

- **Administrador**
  - Email: `administrador@gmail.com`
  - Senha: `123456`
  
- **Docente**
  - Email: `docente@teste.com`
  - Senha: `123456`

- **Aluno**
  - Email: `maria@teste.com`
  - Senha: `123456`

## Páginas de Navegação

Cada tipo de usuário será redirecionado para uma página inicial específica após o login. Abaixo estão as funcionalidades disponíveis para cada perfil:

### Administrador
Após o login, o administrador será redirecionado para a página inicial que exibe:
- Estatísticas de docentes, alunos e turmas no sistema.
- Uma seção com a lista de alunos cadastrados e a possibilidade de realizar buscas por alunos específicos.

No menu lateral, o administrador pode:
- Cadastrar docentes, alunos, turmas e notas.
- Buscar a lista de docentes cadastrados no sistema.

### Docente
Após o login, o docente será redirecionado para a página inicial que exibe:
- A lista de alunos cadastrados no sistema, com a possibilidade de buscar por alunos específicos.

No menu lateral, o docente pode:
- Cadastrar turmas.
- Cadastrar notas.

### Aluno
Após o login, o aluno será redirecionado para a página inicial que exibe:
- Uma seção com avaliações realizadas pelo aluno.
- Uma seção com o curso que está matriculado.
- Uma seção com cursos extras.

No menu lateral, o aluno pode:
- Consultar detalhes sobre suas avaliações e turmas em que está matriculado.
