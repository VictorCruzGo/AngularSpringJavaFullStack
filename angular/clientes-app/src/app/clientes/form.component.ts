import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  //Angular usa el patron MVVM (Modelo Vista Vista Modelo)
  //ngModel va a poblar al objeto cliente con los datos del formulario
  //binding = poblar/enlazar en ambas direcciones.
  //El formulario esta mapeado a un objeto. El objeto es un atributo en la clase componente.
  public cliente:Cliente=new Cliente();
  public titulo:String="Crear cliente";
  
  //Inyectar ClienteService
  constructor(private clienteService:ClienteService,
    private router:Router) { }

  ngOnInit(): void {
  }

  //1.forma
  // public create():void{
  //   console.log("Clicked!!");
  //   console.log(this.cliente);
  //   //El observable suscribe al observer (metodo create()) para que el observador escuche los cambios del observable  
  //    this.clienteService.create(this.cliente).subscribe(
  //      Response=>this.router.navigate(['/clientes'])
  //    )
  // }

  //2.forma
  public create():void{
    console.log("Clicked!!");
    console.log(this.cliente);
    //El observable suscribe al observer (metodo create()) para que el observador escuche los cambios del observable
    this.clienteService.create(this.cliente).subscribe(
    Cliente=>{
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente',`Cliente ${Cliente.nombre} creado con exito`, 'success')
      }
    )
  }
} 
