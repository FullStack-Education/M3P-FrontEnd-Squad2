import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DocenteInterface } from '../../../shared/interfaces/docente.interface';
import { DocenteService } from '../../../core/services/docente/docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriaService } from '../../../core/services/materia/materia.service';
import { MateriaInterface } from '../../../shared/interfaces/materia.interface';
import {
  NgSelectComponent,
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
} from '@ng-select/ng-select';
import { ConsultaCepService } from '../../../core/services/busca-cep/consulta-cep.service';
import { LabelErroDirective } from '../../../core/directives/label-erro/label-erro.directive';
import { dataNascimentoValidator } from '../../../core/validators/dataNascimento/data-nascimento.validator';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NotaService } from '../../../core/services/nota/nota.service';
import { TurmaService } from '../../../core/services/turma/turma.service';

@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LabelErroDirective,
    NgSelectComponent,
    NgOptionTemplateDirective,
    NgLabelTemplateDirective,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './cadastro-docente.component.html',
  styleUrl: './cadastro-docente.component.scss',
})
export class CadastroDocenteComponent implements OnInit {
  cadastroForm!: FormGroup;
  listagemMaterias: MateriaInterface[] = [];
  id!: string | null;
  docenteVinculadoTurma: boolean | null = null;
  docenteVinculadoNota: boolean | null = null;

  constructor(
    private docenteService: DocenteService,
    private materiaService: MateriaService,
    public activatedRoute: ActivatedRoute,
    private cepService: ConsultaCepService,
    private notaService: NotaService,
    private turmaService: TurmaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarForm();
    this.obterMaterias();
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.docenteService.getDocenteById(this.id).subscribe((retorno) => {
        if (retorno) {
          this.cadastroForm.patchValue({
            ...retorno,
            materias: retorno.materias.map((materia) => materia.id),
          });
        }
      });
      this.verificarDocenteEmNota(this.id);
      this.verificarDocenteEmTurma(this.id);
    }
  }

  criarForm() {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      perfil: new FormControl('docente'),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      telefone: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
      ]),
      genero: new FormControl('', Validators.required),
      estadoCivil: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', [
        Validators.required,
        dataNascimentoValidator(),
      ]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      naturalidade: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      materias: new FormControl([], Validators.required),
      cep: new FormControl(''),
      logradouro: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      localidade: new FormControl(''),
      uf: new FormControl(''),
      referencia: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const formValue = this.cadastroForm.value;
      formValue.materias = this.listagemMaterias.filter((materia) =>
        formValue.materias.includes(materia.id)
      );

      if (this.id) {
        this.editar(this.cadastroForm.value);
      } else {
        this.cadastrar(this.cadastroForm.value);
      }
    } else {
      alert('Preencha todos os campos marcados com um *');
    }
  }

  cadastrar(usuario: DocenteInterface) {
    this.docenteService
      .postDocente(this.cadastroForm.value)
      .subscribe((retorno) => {
        window.alert('Docente cadastrado com sucesso!');
        this.router.navigate(['/listagem-docentes']);
      });
  }

  editar(usuario: DocenteInterface) {
    usuario.id = this.id!;
    this.docenteService.putDocente(usuario).subscribe((retorno) => {
      window.alert('Docente editado com sucesso!');
      this.router.navigate(['/listagem-docentes']);
    });
  }

  verificarDocenteEmTurma(docenteId: string) {
    this.turmaService
      .verificarDocenteEmTurmas(docenteId)
      .subscribe((retorno) => {
        this.docenteVinculadoTurma = retorno;
      });
  }

  verificarDocenteEmNota(docenteId: string) {
    this.notaService.verificarDocenteEmNotas(docenteId).subscribe((retorno) => {
      this.docenteVinculadoNota = retorno;
    });
  }

  excluir() {
    if (this.id) {
      if (this.docenteVinculadoNota && this.docenteVinculadoTurma) {
        alert(
          'Docente não pode ser excluído por estar vínculado a turma e/ou avaliações'
        );
      } else {
        this.docenteService.deleteDocente(this.id).subscribe(() => {
          window.alert('Docente excluído com sucesso!');
          this.router.navigate(['/listagem-docentes']);
        });
      }
    }
  }

  obterMaterias() {
    this.materiaService.getMaterias().subscribe((materias) => {
      this.listagemMaterias = materias.map((materia) => ({
        id: materia.id,
        nomeMateria: materia.nomeMateria,
      }));
    });
  }

  buscarCep() {
    if (this.cadastroForm.value.cep) {
      this.cepService.buscarCep(this.cadastroForm.value.cep).subscribe({
        next: (retorno) => {
          if ((retorno as any).erro) {
            window.alert('CEP digitado inválido');
          } else {
            this.cadastroForm.patchValue(retorno);
          }
        },
        error: (err) => {
          window.alert('Ocorreu um erro ao buscar o CEP digitado');
          console.log(err);
        },
      });
    }
  }
}
