import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

//DetalleComponente, mostrara informacion del cliente con la opcion de subir imagen.
export class DetalleComponent implements OnInit {
  //En el Detalle se necesitara datos del objeto Cliente
  cliente:Cliente
  titulo:String="Detalle del cliente"

  //Inyectar ClienteServic y ActivatedRoute via constructor
  //ActivatedRoute: Para editar un cliente, ver cuando cambia el parametro del ID.
  constructor(private clienteService:ClienteService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
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
    this.activatedRoute.paramMap.subscribe(params=>{
      let id=+params.get('id')
      if (id) {
        //Susbcribir para obtener datos del cliente
        this.clienteService.getCliente(id).subscribe(cliente=>{
        this.cliente=cliente
        })
      }
    })
  }

}
