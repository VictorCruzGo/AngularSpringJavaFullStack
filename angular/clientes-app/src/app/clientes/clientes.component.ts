import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './detalle/modal.service';
//import { CLIENTES } from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  //Atributos
  clientes: Cliente[]
  paginador:any
  clienteSeleccionado:Cliente
  //private clienteService:ClienteService;//1

  //1ra forma de inyectar un servicio
  //constructor() {
  //this.clienteService=new ClienteService();
  //}

  //2da forma de inyecar un servicio
  //constructor(private clienteService:ClienteService){}
  constructor(
    private clienteService: ClienteService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) {}

  //3ra forma de inyecar un servicio
  //constructor(clienteService:ClienteService){
  //this.clienteService=clienteService;
  //}

  //Evento cuando se inicia el componente. No reactivo
  //ngOnInit(): void {
  //this.clientes=this.clienteService.getClientes();
  //}

  //Se crea e inicializa una sola vez. Solo cambia el parametro page
  ngOnInit(): void {
    //Recuperar el parametro 'page' desde un observable
    //Se encarga de suscribir un observador cada vez que cambia el parametro page en la ruta.
    //Observable=this.activatedRoute=bibliote de angular
    //Observador=(params)=>{...}=funcion lambda o funcion anonima
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }

      //Suscribir al Observable a un Observador para recibir datos asicronamente
      this.clienteService
        .getClientes(page)
        .pipe(
          tap((response) => {
            console.log('ClienteComponent: tap 3');
            (response.content as Cliente[]).forEach((cliente) => {
              console.log(cliente.nombre);
            });
          })
        )
        .subscribe(
          //Suscribir al observable
          (response) => {//1ra forma Observador
            this.clientes = response.content as Cliente[]
            this.paginador=response //response contiene todos los atributos del paginador
          }
          //(clientes)=>{this.clientes=clientes} //2da forma
          //function clientes{this.clientes=clientes} //3ra forma
        );
    });
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        //Observable.suscribe(observer)
        this.clienteService.delete(cliente.id).subscribe((Response) => {
          //Filtrar el cliente eliminado
          this.clientes = this.clientes.filter((cli) => cli !== cliente);
          Swal.fire('Eliminado!', 'El registro fue borrado.', 'success');
        });
      }
    });
  }

  abrirModal(cliente:Cliente){
    this.clienteSeleccionado=cliente
    this.modalService.abrirModal()
  }
}
