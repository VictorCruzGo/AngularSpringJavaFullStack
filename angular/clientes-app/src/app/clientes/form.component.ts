import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  //Angular usa el patron MVVM (Modelo Vista Vista Modelo)
  //ngModel va a poblar al objeto cliente con los datos del formulario
  //binding = poblar/enlazar en ambas direcciones.
  //El formulario esta mapeado a un objeto. El objeto es un atributo en la clase componente.
  private cliente:Cliente=new Cliente();
  private titulo:String="Crear cliente";
  
  constructor() { }

  ngOnInit(): void {
  }

  public create():void{
    console.log("Clicked!!");
    console.log(this.cliente);
  }

}
