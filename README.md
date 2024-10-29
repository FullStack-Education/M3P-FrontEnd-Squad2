# Projeto LabPCP - Angular

Projeto final do segundo módulo do curso Floripa Mais Tec - Turma Fullstack Education

Sistema para gestão de projetos educacionais construído utilizando o framework Angular

## Execução da aplicação

No terminal, execute os seguintes comandos:

1. **Iniciar o servidor Angular:**
   ```bash
   ng serve --proxy-config proxy.conf.json

Isso iniciará a aplicação e gerará uma URL para você navegar.




## Funcionamento

Para acessar as páginas da aplicação, você precisará realizar o login na página de login.

### Usuários Pré-Cadastrados

Há usuários pré-cadastrados no sistema com perfis: administrador, docente e aluno. Use as seguintes credenciais para fazer login com cada perfil:

- **Administrador:**
  - Email: `adm@teste.com`
  - Senha: `12345678`

- **Docente:**
  - Email: `docente@teste.com`
  - Senha: `12345678`

- **Aluno:**
  - Email: `aluno@teste.com`
  - Senha: `12345678`


## Páginas de Navegação

Cada tipo de usuário será redirecionado para uma página inicial específica após o login. Abaixo estão as funcionalidades disponíveis para cada perfil:

- **Administrador:**
  - Após o login, o administrador será redirecionado para a página inicial que exibe:
    - Estatísticas de docentes, alunos e turmas no sistema.
    - Uma seção com a lista de alunos cadastrados e a possibilidade de realizar buscas por alunos específicos.
  - No menu lateral, o administrador pode:
    - Cadastrar docentes, alunos, turmas e notas.
    - Buscar a lista de docentes cadastrados no sistema.

- **Docente:**
  - Após o login, o docente será redirecionado para a página inicial que exibe:
    - A lista de alunos cadastrados no sistema, com a possibilidade de buscar por alunos específicos.
  - No menu lateral, o docente pode:
    - Cadastrar turmas.
    - Cadastrar notas.

- **Aluno:**
  - Após o login, o aluno será redirecionado para a página inicial que exibe:
    - Uma seção com avaliações realizadas pelo aluno.
    - Uma seção com as matérias em que está matriculado.
    - Uma seção com cursos extras.
  - No menu lateral, o aluno pode:
    - Consultar detalhes sobre suas avaliações e turmas em que está matriculado
