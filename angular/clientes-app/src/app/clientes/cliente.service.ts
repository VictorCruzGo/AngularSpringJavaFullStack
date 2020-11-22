import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

//El decorador indica que tipo clase representa en angular.
//@Inyectable=Clase Servicio.
//Se puede inyectar a otra clase.
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //EndPoint del servicio REST.
  private urlEndPoint:string='http://localhost:8080/api/clientes';

  //Cabecera http.
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})

  //Inyectar el HttpClient via constructor.
  constructor(private http:HttpClient) { }

  //Observable=Stream de datos
  //getClientes():Observable<Cliente[]>{
    //1.Si REST
    //return of(CLIENTES) ;
    
    //2.Con REST y CAST
    //Retorna un observable del tipo Any. Hacer un cast al tipo Cliente
    //El metodo get siempre va a retornar un tipo observable
    //Dentro del cuerpo (promesa) va a devolver y json por defecto sin tipo. Convertir al la clase Cliente
    // return this.http.get<Cliente[]>(this.urlEndPoint);
    
    //3.Con REST, RactxJS,CAST
    //Map convierte el tipo json dentro de la promesa. Castea al tipo Cliente
    // return this.http.get(this.urlEndPoint).pipe(
    //   map( Response => Response as Cliente[])
    // );
    
    //4.Con REST, Funcion anonima,CAST
    // return this.http.get(this.urlEndPoint).pipe(
    //    map( function(Response) {return Response as Cliente[]})
    //  );
  //}

  getClientes():Observable<Cliente[]>{
     return this.http.get(this.urlEndPoint).pipe(
       map( Response => Response as Cliente[])
    );
  }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers:this.httpHeaders})
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
    //Forma alternativa.
    //return this.http.get<Cliente>(this.urlEndPoint+'/'+id).
  }

  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpHeaders})
  }

  delete(id):Observable<Cliente>{
    //No es necesario pasar las cabeceras
    //return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders})
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`)
  }
}
