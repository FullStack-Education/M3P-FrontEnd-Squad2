import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlunoService } from '../../core/services/aluno/aluno.service';
import { AlunoInterfaceRequest} from '../../shared/interfaces/aluno.interface';
import { TurmaService } from '../../core/services/turma/turma.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaInterface, TurmaResponseInterface } from '../../shared/interfaces/turma.interface';
import {
  NgSelectComponent,
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
} from '@ng-select/ng-select';
import { ConsultaCepService } from '../../core/services/busca-cep/consulta-cep.service';
import { LabelErroDirective } from '../../core/directives/label-erro/label-erro.directive';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { dataNascimentoValidator } from '../../core/validators/dataNascimento/data-nascimento.validator';
import { NotaService } from '../../core/services/nota/nota.service';
import { DocenteService } from '../../core/services/docente/docente.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-cadastro-aluno',
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
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.scss',
})
export class CadastroAlunoComponent implements OnInit {
  cadastroForm!: FormGroup;
  id!: string | null;
  listagemTurmas: TurmaResponseInterface[] = [];
  alunoVinculadoNota: boolean | null = null;
  

  constructor(
    private alunoService: AlunoService,
    private turmaService: TurmaService,
    private notaService: NotaService,
    public activatedRoute: ActivatedRoute,
    private cepService: ConsultaCepService,
    private docenteService: DocenteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarForm();
    this.obterTurmas();

    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.alunoService.getAlunoById(this.id).subscribe((retorno) => {
        if (retorno) {
          this.cadastroForm.patchValue({
            ...retorno,
            turma: retorno.turma.id, 
          });
        }
      }); 

      this.verificarAlunoEmNota(this.id);
    }
  }

  criarForm() {
    this.cadastroForm = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      perfil: new FormControl('aluno'),
      email: new FormControl('', Validators.email),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      telefone: new FormControl('',  [
        Validators.required,
        Validators.minLength(12),
      ]),
      genero: new FormControl('', Validators.required),
      turma: new FormControl('', Validators.required),
      dataNascimento: new FormControl('',  [
        Validators.required,
        dataNascimentoValidator(),
      ]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
      ]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      naturalidade: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      cep: new FormControl('', Validators.required),
      logradouro: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      localidade: new FormControl(''),
      uf: new FormControl('', Validators.required),
      referencia: new FormControl(''),
    });
  }


  onSubmit() {
    if (this.cadastroForm.valid) {
      const formValue = this.cadastroForm.value;

      if (this.id) {
        this.editar(this.cadastroForm.value);
      } else {
        this.cadastrar(formValue); 
      }
    } else {
      alert('Preencha todos os campos marcados com um *');
    }
  }

  cadastrar(usuario: AlunoInterfaceRequest) {
    this.alunoService.postAluno(usuario).subscribe((retorno) => {
      window.alert('Aluno cadastrado com sucesso!');
      this.router.navigate(['/inicio']);
    }, error => {
      window.alert('Erro ao cadastrar aluno: email já cadastrado' + error.message);
    });
  }
  

  
  editar(usuario: AlunoInterfaceRequest) {
    if (this.id) {
      this.alunoService.putAluno(this.id, usuario).subscribe(
        (retorno) => {
          window.alert('Aluno editado com sucesso!');
          this.router.navigate(['/inicio']);
        },
        (error) => {
          window.alert('Erro ao editar aluno: email já cadastrado ' );
        }
      );
    }
  }
  


  verificarAlunoEmNota(alunoId: string) {
    this.notaService.verificarAlunoEmNotas(alunoId).subscribe(
      (retorno) => {
        this.alunoVinculadoNota = retorno;
      },
      (error) => {
        console.error('Erro ao verificar aluno em notas:', error);
        this.alunoVinculadoNota = false; 
      }
    );
  }
  


  excluir(){
    if (this.id) {
      if (this.alunoVinculadoNota) {
        alert('Aluno não pode ser excluído por estar vínculado a  avaliações');
      } else {
        this.alunoService.deleteAluno(this.id).subscribe(() => {
          window.alert('Aluno excluído com sucesso!');
          this.router.navigate(['/inicio']);
        });
      }
    }
  }

  obterTurmas() {
    this.turmaService.getTurmas().subscribe(turmas => {
      // Cria um array de observables para buscar os docentes de cada turma
      const docentesObservables = turmas.map((turma) => 
        this.docenteService.getDocenteById('1').pipe(
          map(docente => ({ ...turma, docente })) // Mapeia o resultado para incluir o docente na turma
        )
      );
  
      // Usa forkJoin para esperar que todos os observables de docentes sejam concluídos
      forkJoin(docentesObservables).subscribe(turmasComDocente => {
        this.listagemTurmas = turmasComDocente.map((turma) => ({
          id: turma.id,
          nome: turma.nome,
          docenteId: turma.docente,
          dataInicio: turma.dataInicio,
          dataTermino: turma.dataTermino,
          horario: turma.horario,
          cursoId: turma.cursoId
        }));
      });
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
