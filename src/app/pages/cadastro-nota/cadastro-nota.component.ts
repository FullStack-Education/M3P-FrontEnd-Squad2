import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotaService } from '../../core/services/nota/nota.service';
import { DocenteService } from '../../core/services/docente/docente.service';
import { AlunoService } from '../../core/services/aluno/aluno.service';
import {
  NotaInterfaceRequest,
} from '../../shared/interfaces/nota.interface';
import { MateriaService } from '../../core/services/materia/materia.service';
import { LabelErroDirective } from '../../core/directives/label-erro/label-erro.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-nota',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LabelErroDirective],
  templateUrl: './cadastro-nota.component.html',
  styleUrl: './cadastro-nota.component.scss',
})
export class CadastroNotaComponent implements OnInit {
  cadastroForm!: FormGroup;
  listagemDocentes: Array<{ id: string; nome: string }> = [];
  listagemAlunos: Array<{ id: string; nome: string }> = [];
  listagemMaterias: Array<{ id: number; nome: string }> = [];

  perfilUsuarioLogado: string | null = null;
  idUsuarioLogado: string | null = null;
  dadosDocenteLogado: { id: string; nome: string } = { id: '', nome: '' };

  constructor(
    private notaService: NotaService,
    private docenteService: DocenteService,
    private alunoService: AlunoService,
    private materiaService: MateriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.perfilUsuarioLogado = sessionStorage.getItem('perfil');
    this.idUsuarioLogado = sessionStorage.getItem('userId');

    this.criarForm();
    this.obterAlunos();
    this.obterMaterias();
    this.obterDatasAtual();

    if (this.perfilUsuarioLogado === 'administrador') {
      this.obterDocentes();
    } else {
      if (this.idUsuarioLogado) this.obterDocenteLogado(this.idUsuarioLogado);
    }
  }

  criarForm() {
    this.cadastroForm = new FormGroup({
      aluno: new FormControl('', Validators.required),
      docente: new FormControl('', Validators.required),
      materiaId: new FormControl('', Validators.required),
      nomeAvaliacao: new FormControl('', Validators.required),
      dataAvaliacao: new FormControl('', Validators.required),
      valorNota: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(10),
      ]),
    });
  }

  obterDocentes() {
    this.docenteService.getDocentes().subscribe((docentes) => {
      this.listagemDocentes = docentes.map((docente) => ({
        id: docente.id.toString(),
        nome: docente.nome,
      }));
    });
  }

  obterDocenteLogado(id: string) {
    this.docenteService.getDocenteByUserId(id).subscribe((retorno) => {
      if (retorno) { 
        this.dadosDocenteLogado = {
          id: retorno.id,
          nome: retorno.nome,
        };
        this.cadastroForm.get('docente')?.setValue(this.dadosDocenteLogado.id);
      }
    });
  }
  

  obterAlunos() {
    this.alunoService.getAlunos().subscribe((alunos) => {
      this.listagemAlunos = alunos.map((aluno) => ({
        id: aluno.id.toString(),
        nome: aluno.nome,
      }));
    });
  }

  obterMaterias() {
    this.materiaService.getMaterias().subscribe((materias) => {
      this.listagemMaterias = materias.map((materia) => ({
        id: Number(materia.id),
        nome: materia.nome,
      }));
    });
  }

  obterDatasAtual() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    const dataAtual = `${ano}-${mes}-${dia}`;
    this.cadastroForm.get('dataAvaliacao')?.setValue(dataAtual);
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.cadastrar(this.cadastroForm.value);
    } else {
      alert('Todos os campos marcados com * são obrigatórios!');
    }
  }

  cadastrar(nota: NotaInterfaceRequest) {
    const alunoId = Number(this.cadastroForm.get('aluno')?.value);
    const docenteId = Number(this.cadastroForm.get('docente')?.value);
    const materiaId = Number(this.cadastroForm.get('materiaId')?.value);

    const notaRequest: NotaInterfaceRequest = {
      nome: this.cadastroForm.get('nomeAvaliacao')?.value,
      valor: this.cadastroForm.get('valorNota')?.value,
      dataAvaliacao: this.cadastroForm.get('dataAvaliacao')?.value,
      alunoId: alunoId,
      docenteId: docenteId,
      materiaId: materiaId,
    };

    this.notaService.postNota(notaRequest).subscribe((retorno) => {
      window.alert('Nota cadastrada com sucesso!');
      this.router.navigate(['/inicio']);
    });
  }
}
