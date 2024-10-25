import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
  standalone: true,
})
export class TelefonePipe implements PipeTransform {
  transform(telefone: string): string {
    const cleanTelefone = telefone.replace(/\D/g, '');

    const match = cleanTelefone.match(/^(\d{2})(\d)(\d{4})(\d{5})$/);
    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }

    return telefone;
  }
}
