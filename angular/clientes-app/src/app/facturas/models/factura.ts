import { Cliente } from "../../clientes/cliente"
import { ItemFactura } from "./item-factura"

export class Factura {
  id:number
  descripcion:string
  observacion:string
  createAt:string
  cliente:Cliente
  items:ItemFactura[]=[]
  total:number

}
