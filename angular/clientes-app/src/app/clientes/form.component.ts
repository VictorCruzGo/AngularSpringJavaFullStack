import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //ActivatedRoute, obtine informacion de la ruta activa. Ej. parametros
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  //Angular usa el patron MVVM (Modelo Vista Vista Modelo).
  //ngModel va a poblar al objeto cliente con los datos del formulario.
  //binding = poblar/enlazar en ambas direcciones.
  //El formulario esta mapeado a un objeto. El objeto es un atributo en la clase componente.
  public cliente:Cliente=new Cliente()
  regiones:Region[]
  public titulo:string="Crear cliente"
  public errores:string[]

  //Inyectar ClienteService
  constructor(
    private clienteService:ClienteService,
    private router:Router,
    private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  //1.forma.
  // public create():void{
  //   console.log("Clicked!!");
  //   console.log(this.cliente);
  //   //El observable suscribe al observer (metodo create()) para que el observador escuche los cambios del observable
  //    this.clienteService.create(this.cliente).subscribe(
  //      Response=>this.router.navigate(['/clientes'])
  //    )
  // }

  //2.forma.
  //Con objeto Any
  // public create():void{
  //   console.log("Clicked!!");
  //   console.log(this.cliente);
  //   //El observable suscribe al observer (metodo create()) para que el observador escuche los cambios del observable
  //   this.clienteService.create(this.cliente).subscribe(
  //   json=>{
  //       this.router.navigate(['/clientes'])
  //       Swal.fire('Nuevo cliente',`Cliente ${json.cliente.nombre} creado con exito`, 'success')
  //     }
  //   )
  // }

  //3.forma.
  //Con objeto Cliente transformado
  public create():void{
    console.log("Clicked!!")
    console.log(this.cliente)
    console.log(this.cliente.createAt)
    //El observable suscribe al observer (metodo create()) para que el observador escuche los cambios del observable
    this.clienteService.create(this.cliente).subscribe(
      //Exito, primer argumento.
      cliente=>{
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente',`Cliente ${cliente.nombre} creado con exito`, 'success')
      },
      //Error, segundo argumento. Suscribir a un observador, cuando las cosas salen mal.
      err=>{
        //this.errores=Atributo de la clase
        //err tiene atribuos error y status
        //err.error.errors=objeto.atributo.json
        this.errores=err.error.errors as string[]
        console.error('Codigo del error en el backend: '+err.status)
        console.error(err.error.errors)
      }
      //Completo, tercer parmetro
    )
  }

  cargarCliente():void{
    //Suscribir un observador que esta observando cuando obtengamos un ID.
    //Observable=activateRoute.params
    //Observador=funcion anonima o funcion lambda o expresion lambda.
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
    });


    this.clienteService.getRegiones().subscribe(regiones=>{
      this.regiones=regiones
    });
  }

  //1 forma
  //Con objeto any
  // update():void{
  //   this.clienteService.update(this.cliente)
  //   .subscribe( json=>{
  //     this.router.navigate(['/clientes'])
  //     Swal.fire('Cliente Actualizado', `Cliente ${json.cliente.nombre} actualizado con exito`,'success')
  //   }
  //   )
  // }

  //2 forma
  //Con objeto Cliente transformado
  update():void{
    console.log(this.cliente)
    this.cliente.facturas=null //Al editar los datos del cliente no es necesario actualizar sus facturas//Evita Problema de recursion

    this.clienteService.update(this.cliente)
    .subscribe(
    //Exito. Primer parametro.
      cliente=>{
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito`,'success')
    },
    //Error. Segundo parametro.
    err=>{
      this.errores=err.error.errors as string[]
      console.error('Codigo del error en el backend: '+err.status)
      console.error(err.error.errors)
    }
    //Completo. Tercer parametro.
    )
  }


  compararRegion(o1:Region,o2:Region):boolean{
    if (o1===undefined && o2===undefined) {
      return true
    }
    return o1==null || o2==null? false: o1.id===o2.id;
  }

}
