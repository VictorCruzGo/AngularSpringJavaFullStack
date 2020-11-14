import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  //styleUrls: ['./directiva.component.css']
})
//export class DirectivaComponent implements OnInit {
export class DirectivaComponent  {  
  listaCurso:string[]=['TypeScript','JavaScript','Java','Golang','C++'];
  habilitar:boolean=true;
  constructor() { }

  setHabilitar():void{
    this.habilitar=(this.habilitar==true)?false:true;
  }

  getCambiarNombreBoton():string{
    return this.habilitar==(true)?'Ocultar':'Mostrar';
  }
}
