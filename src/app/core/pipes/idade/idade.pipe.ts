import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idade',
  standalone: true
})
export class IdadePipe implements PipeTransform {

  transform(dataNascimento: Date | string): number {
    const data = typeof dataNascimento === 'string' ? new Date(dataNascimento) : dataNascimento;
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    let idade = anoAtual - data.getFullYear();

    if (mesAtual < data.getMonth() || (mesAtual === data.getMonth() && diaAtual < data.getDate())) {
      idade--;
    }

    return idade;
  }

}
