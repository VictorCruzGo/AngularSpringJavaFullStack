import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {
  @Input() paginador:any //Atributo inyectable
  paginas:number[]
  constructor() { }

  ngOnInit(): void {
    //Crear la numeracion de paginas apartir del atribujo totalPages del json
    this.paginas=new Array(this.paginador.totalPages)
    .fill(0)
    .map((_valor,indice)=>indice+1)
  }

}
