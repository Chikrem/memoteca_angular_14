import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from './../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  // pensamento: Pensamento = {
  //   id: '',
  //   conteudo: '',
  //   autoria: '',
  //   modelo: ''
  // }

  // Podemos utilizar a interpolação para acessar no html os valores das propriedades declaradas na classe typescript. Agora, esses valores estão dentro do formulário e não mais no objeto ‘pensamento’, como anteriormente.

  // Para acessar: <p>{{ formulario.get('conteudo')?.value }}</p>

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder // Construtor de formulários reativos.
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/), Validators.minLength(3)])], // Validador. Campo Requerido. Evitar espaços em branco. Tamanho mínimo.
      autoria: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      modelo: ['modelo1'],
      favorito: [false]
    })
  }

  // Validators: https://angular.dev/api/forms/Validators

  criarPensamento() {

    console.log(this.formulario.status)
    console.log(this.formulario.get('autoria')?.errors)

    if (this.formulario.valid) {    // Se o formulário for válido => Criar formulário.
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string {

    if (this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }

  }

}
