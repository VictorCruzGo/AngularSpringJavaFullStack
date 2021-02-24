import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from 'src/app/facturas/models/factura';
import { FacturaService } from 'src/app/facturas/services/factura.service';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';


@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

//DetalleComponente, mostrara informacion del cliente con la opcion de subir imagen.
export class DetalleComponent implements OnInit {
  //En el Detalle se necesitara datos del objeto Cliente
  //@Input permite recibir datos desde la vista de otro componente
  @Input() cliente:Cliente
  titulo:String="Detalle del cliente"
  //private fotoSeleccionada:File
  fotoSeleccionada:File
  progreso:number=0
  _modalService:ModalService


  //Inyectar ClienteServic y ActivatedRoute via constructor
  //ActivatedRoute: Para editar un cliente, ver cuando cambia el parametro del ID.
  constructor(
    private facturaService:FacturaService,
    private clienteService:ClienteService,
    private modalService:ModalService,
    private activatedRoute:ActivatedRoute) {
      this._modalService=modalService
     }

  //Subscrbir para obter el ID del cliente.
    /*
    Observable=this.activatedRoute.paramMap
      clientes/ver/1  <-
      clientes/ver/2
      clientes/ver/3
      ...
    Observador=Obtiene los ID
      1 <-
      2
      3
      ...
    Observable=this.clienteService.getCliente(ID)
      {"id":1,"nombre":"Victor","apellido":"Cruz"} <-
      {"id":2,"nombre":"Adan","apellido":"Peres"}
      {"id":3,"nombre":"Hector","apellido":"Ruiz"}
      ...
    Observador=Obtiene los datos del Cliente
      Cliente_1 <-
      Cliente_2
      Cliente_3
      ...
    */

  ngOnInit(): void {
    // Ya no es necesario porque se pasaran los datos desde 'clientes' a 'detalle'
    // this.activatedRoute.paramMap.subscribe(params=>{
    //   let id=+params.get('id')
    //   if (id) {
    //     //Susbcribir para obtener datos del cliente
    //     this.clienteService.getCliente(id).subscribe(cliente=>{
    //     this.cliente=cliente
    //     })
    //   }
    // })
  }

  /*$event, atraves del evento se accede al archivo enviado*/
  seleccionarFoto(event){
    this.fotoSeleccionada=event.target.files[0] //Files tiene un arreglo de archivos. En ese caso solo se esta subiendo una imagen.
    this.progreso=0
    console.log(this.fotoSeleccionada)
    if (this.fotoSeleccionada.type.indexOf('image')<0) {
      Swal.fire('Error Seleccionar Imagen','El archivo debe ser del tipo imagen','error')
      this.fotoSeleccionada=null
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire('Error upload','Debe seleccionar una foto','error')
    }else{
      this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id)
      .subscribe(event=>{
        if(event.type===HttpEventType.UploadProgress){
          this.progreso=Math.round((event.loaded/event.total)*100)
        }else if(event.type===HttpEventType.Response){
          let response:any=event.body
          this.cliente=response.cliente as Cliente

          //Publicar
          this._modalService.notificarUpload.emit(this.cliente) //Emitir el cliente actualizado

          Swal.fire('La foto se ha subido completamente!',response.mensaje,'success')
        }
      })
    }
  }

  subirFoto2(){
    // if(!this.fotoSeleccionada){
    //   Swal.fire('Error upload','Debe seleccionar una foto','error')
    // }else{
    //   this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id)
    //   .subscribe(cliente=>{
    //     //Obtener el cliente desde el flujo.
    //     //Susbcribir el cambio de la foto del cliente. Actualizar.
    //     this.cliente=cliente;
    //     Swal.fire('La foto se ha subido completamente!',`La foto se ha subido con exito: ${this.cliente.foto}`,'success')
    //   })
    // }
  }

  cerrarModal(){
    this._modalService.cerrarModal()
    this.fotoSeleccionada=null
    this.progreso=0
  }

  delete(factura:Factura): void{
    Swal.fire({
      title: 'Estas seguro?',
      text: `Seguro que desea eliminar la factura ${factura.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.value) {
        //Observable.suscribe(observer)
        this.facturaService.delete(factura.id).subscribe((Response) => {
          //Filtrar el cliente eliminado
          this.cliente.facturas = this.cliente.facturas.filter((f) => f !== factura);
          Swal.fire('Factura eliminado!', 'La factura fue eliminado con exito.', 'success');
        });
      }
    });
  }

}
