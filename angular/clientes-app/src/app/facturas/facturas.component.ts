import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { flatMap, map, startWith } from 'rxjs/operators'
import { ClienteService } from '../clientes/cliente.service'
import { Factura } from './models/factura'
import { ItemFactura } from './models/item-factura'
import { Producto } from './models/producto'
import {FacturaService} from './services/factura.service'

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {
   titulo:string='Nueva Factura'
   factura:Factura=new Factura()
   autocompleteControl = new FormControl();
   //productos: string[] = ['TV', 'radio', 'television'];
   //productosFiltrados: Observable<string[]>;
   productosFiltrados: Observable<Producto[]>;

   constructor(
    private facturaService:FacturaService,
    private clienteService:ClienteService,
     private activatedRoute:ActivatedRoute) {

     }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let clienteId=+params.get('clienteId')
      this.clienteService.getCliente(clienteId).subscribe(cliente=>
        this.factura.cliente=cliente
      )
    })

    // this.productosFiltrados = this.autocompleteControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => this.filtrar(value))
    // )

    this.productosFiltrados = this.autocompleteControl.valueChanges
    .pipe(
      //Convertir los datos de un flujo con los datos que provienen de otro flujo
      map(value=>typeof value==='string'?value:value.nombre),//Convertir el objeto producto a un objeto string
      flatMap(value => value?this.filtrar(value):[])//Aplanar los valores de un observable dentro de otro observable.
    )
  }

  // private filtrar(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.productos.filter(option => option.toLowerCase().includes(filterValue));
  // }

  private filtrar(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?:Producto):string|undefined{//recibe un parametro opcional
    return producto?producto.nombre:undefined
  }

  seleccionarProducto(event:MatAutocompleteSelectedEvent):void{
    let producto=event.option.value as Producto;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id)
    }else{
      let nuevoItem=new ItemFactura()
      nuevoItem.producto=producto
      this.factura.items.push(nuevoItem)
    }

    this.autocompleteControl.setValue('')
    event.option.focus()
    event.option.deselect()
  }

  actualizarCantidad(id:number, event:any):void{
    let cantidad:number=event.target.value as number

    this.factura.items=this.factura.items.map((item:ItemFactura)=>{
      if (id===item.producto.id) {
        item.cantidad=cantidad
      }
      return item
    })
  }

  existeItem(id:number):boolean{
    let existe=false

    this.factura.items.forEach((item:ItemFactura)=>{
      if (id===item.producto.id) {
        existe=true
      }
    })

    return existe
  }

  incrementaCantidad(id:number):void{
    //Map---De ItemFactura a ItemFactura[]
    this.factura.items=this.factura.items.map((item:ItemFactura)=>{
      if (id===item.producto.id) {
        ++item.cantidad;
      }
      return item
    })
  }
}
