import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, Observable } from 'rxjs';

//El decorador indica que tipo clase representa en angular
//@Inyectable=Clase Servicio
//Se puede inyectar a otra clase
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

//Observable=Stream de datos
  getClientes():Observable<Cliente[]>{
    return of(CLIENTES) ;
  }
}
