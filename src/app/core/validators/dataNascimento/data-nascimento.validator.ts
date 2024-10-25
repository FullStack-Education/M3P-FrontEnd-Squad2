import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dataNascimentoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dataValor = control.value;

    if (!dataValor) {
      return { required: true };
    }

    const hoje = new Date();
    const data = new Date(dataValor);

    if (data > hoje) {
      return { dataInvalida: true };
    }

    return null;
  };
}
