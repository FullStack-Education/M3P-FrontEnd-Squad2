import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurmaService } from '../../core/services/turma/turma.service';
import { TurmaInterface, TurmaRequestInterface, TurmaResponseInterface } from '../../shared/interfaces/turma.interface';
import { DocenteService } from '../../core/services/docente/docente.service';
import { LabelErroDirective } from '../../core/directives/label-erro/label-erro.directive';
import { Router } from '@angular/router';
import { CursoService } from '../../core/services/curso/curso.service';
import { DocenteResponseInterface } from '../../shared/interfaces/docente.interface';
import { MateriaResponseInterface } from '../../shared/interfaces/materia.interface';

@Component({
  selector: 'app-cadastro-turma',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LabelErroDirective],
  templateUrl: './cadastro-turma.component.html',
  styleUrl: './cadastro-turma.component.scss'
})
export class CadastroTurmaComponent implements OnInit {

  cadastroForm!: FormGroup;
  listagemDocentes: Array<{ id: string, nome: string}> = [];
  listagemCursos: Array<{ id: string, nome: string}> = [];
  perfilUsuarioLogado: string | null = null;
  idUsuarioLogado: string | null = null;
  dadosDocenteLogado: { id: string, nome: string } = { id: '', nome: '' };

  constructor(private turmaService: TurmaService, private docenteService: DocenteService, private cursoService: CursoService, private router: Router){}

  ngOnInit(): void {
    this.perfilUsuarioLogado = sessionStorage.getItem('perfil')
    this.idUsuarioLogado = sessionStorage.getItem('userId')

    this.criarForm();

    this.obterHorarioAtual();

    this.obterDatasAtual();

    if(this.perfilUsuarioLogado === "administrador"){
      this.obterDocentes();
    } else {
      if(this.idUsuarioLogado)
      this.obterDocenteLogado(this.idUsuarioLogado);
    }
  }

  criarForm(){
    this.cadastroForm = new FormGroup({
      nome: new FormControl('',  [ Validators.required, Validators.minLength(8), Validators.maxLength(64) ]),
      docenteId: new FormControl('',  Validators.required),
      cursoId: new FormControl('', Validators.required),
      dataInicio: new FormControl('', Validators.required),
      dataTermino: new FormControl('', Validators.required),
      horario: new FormControl('', Validators.required),
    })

    this.cadastroForm.get('cursoId')?.disable()
  }

  obterDocentes(){
    this.docenteService.getDocentes().subscribe(docentes => {
      this.listagemDocentes = docentes.map(docente => ({
        id: docente.id,
        nome: docente.nome
      }));
    });
  }

  obterDocenteLogado(id: string) {
    this.docenteService.getDocenteById(id).subscribe(retorno => {
      this.dadosDocenteLogado = {
        id: retorno.id,
        nome: retorno.nome
      };
      this.cadastroForm.get('docenteId')?.setValue(this.dadosDocenteLogado.id);
    });
  }

  obterCursos() {
    this.listagemCursos = []
    var docenteId = this.cadastroForm.get('docenteId')?.value as string;

    this.docenteService.getDocenteById(docenteId).subscribe(retorno => {
      this.obterCursoDocente(retorno.materias)
    })

  }

  obterCursoDocente(docentes: MateriaResponseInterface[]) {

    if (!docentes.length) {
      this.cadastroForm.get('cursoId')?.enable();
      return
    }

      this.cursoService.getCursoById(docentes[0].curso_id.toString()).subscribe(responce => {
        if (!this.listagemCursos.some(curso => curso.id == responce.id)) {
          this.listagemCursos.push({
            id: responce.id,
            nome: responce.nome
          })
        }

      docentes.shift()
      this.obterCursoDocente(docentes)
    })
  }

  obterHorarioAtual() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const horarioAtual = `${horas}:${minutos}`;
    this.cadastroForm.get('horario')?.setValue(horarioAtual);
  }

  obterDatasAtual() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataAtual = `${ano}-${mes}-${dia}`;
    this.cadastroForm.get('dataInicio')?.setValue(dataAtual);
    this.cadastroForm.get('dataTermino')?.setValue(dataAtual);
  }

  onSubmit(){
    if(this.cadastroForm.valid){
      this.cadastrar(this.cadastroForm.value);
    } else{
      alert('Preencha todos os campos marcados com um *');
    }
  }

  cadastrar(turma: TurmaRequestInterface){

    console.log(turma)
    this.turmaService.postTurma(turma).subscribe((retorno) => {
      window.alert("Turma cadastrada com sucesso!");
      this.router.navigate(['/inicio']);
    })
  }
}
