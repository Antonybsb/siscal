import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',

})
export class AppComponent  {

  siglaSelecionada: string = ''; // Adicionando a propriedade e inicializando

  title = 'frontend';

  onSiglaSelecionadaChange(sigla: string) {
    this.siglaSelecionada = sigla;
  }

  
}
