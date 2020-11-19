import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //ActivatedRoute, obtine informacion de la ruta activa. Ej. parametros
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
  constructor(
    private clienteService:ClienteService,
    private router:Router,
    private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
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

  cargarCliente():void{
    //Suscribir un observador que esta observando cuando obtengamos un ID.
    //Observable=activateRoute.params
    //Observador=funcion anonima o funcion lambda.
    this.activateRoute.params.subscribe(
      //El observador (expresion lambda), es notificado con el parametro id.
      params=>{
      let id=params[`id`]
      if(id){
        //suscribimos para registrar el observador que asigna el cliente de la consulta al atributo cliente
        this.clienteService.getCliente(id).subscribe(
          //El observador (expresion lambda) asigna al atributo cliente el resultado de la peticion
          (cliente)=>this.cliente=cliente
        )
      }
    })
  }

  update():void{
    this.clienteService.update(this.cliente)
    .subscribe( cliente=>{
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito`,'success')
    }
    )
  }

} 
