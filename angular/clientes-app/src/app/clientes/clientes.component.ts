import { Component, OnInit } from '@angular/core';
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

}
