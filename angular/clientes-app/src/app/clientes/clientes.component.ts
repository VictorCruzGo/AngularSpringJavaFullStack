import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
//import { CLIENTES } from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[];
  //private clienteService:ClienteService;//1

  //1ra forma de inyectar un servicio
  //constructor() {
    //this.clienteService=new ClienteService();
  //}

  //2da forma de inyecar un servicio
  //constructor(private clienteService:ClienteService){}
  constructor(private clienteService:ClienteService){}
  
  //3ra forma de inyecar un servicio
  //constructor(clienteService:ClienteService){
    //this.clienteService=clienteService;
  //}

  //Evento cuando se inicia el componente. No reactivo
  //ngOnInit(): void {
    //this.clientes=this.clienteService.getClientes();
  //}

  ngOnInit(): void {
    //Suscribir al Observable a un Observador para recibir datos asicronamente
    this.clienteService.getClientes().subscribe( //Suscribir al observable
      clientes=>this.clientes=clientes//1ra forma Observador
      //(clientes)=>{this.clientes=clientes} //2da forma
      //function clientes{this.clientes=clientes} //3ra forma
    );
  }

  delete(cliente:Cliente):void{
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        //Observable.suscribe(observer)
        this.clienteService.delete(cliente.id).subscribe(
          Response=>{
            //Filtrar el cliente eliminado
            this.clientes=this.clientes.filter(cli=>cli!==cliente)
            Swal.fire(
              'Eliminado!',
              'El registro fue borrado.',
              'success'
            )
          }
        )        
      }
    })    
  }
}
