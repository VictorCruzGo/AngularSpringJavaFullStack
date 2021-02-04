import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginador: any; //Atributo inyectable
  paginas: number[];

  desde: number;
  hasta: number;

  constructor() {}

  ngOnInit(): void {
    this.initPaginator()
  }

  //Onchange, para reflejar los cambios de paginador
  //Evento para controlar el cambio del 'paginador'
  //SimpleChanges, obtiene los cambios del input() paginador
  ngOnChanges(changes:SimpleChanges): void {
    let paginadorActualizado=changes['paginador']//Obtener los cambios del paginador
    if (paginadorActualizado.previousValue) { //Contiene el valor actual, siguiente del paginador
      this.initPaginator()
    }
  }

  private initPaginator():void{
    this.desde=Math.min(Math.max(1,this.paginador.number-4),this.paginador.totalPages-5);
    this.hasta=Math.max(Math.min(this.paginador.totalPages,this.paginador.number+4),6);

    if (this.paginador.totalPages > 5) {
      this.paginas = new Array(this.hasta-this.desde+1)
      .fill(0)
      .map((_valor, indice) => indice +  this.desde);
    } else {
      //Crear la numeracion de paginas apartir del atribujo totalPages del json
      this.paginas = new Array(this.paginador.totalPages)
        .fill(0)
        .map((_valor, indice) => indice + 1);
    }
  }

}
