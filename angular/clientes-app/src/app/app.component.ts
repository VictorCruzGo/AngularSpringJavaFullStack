//COMPONENTE
//Clase TypeScript
import { AnimationBuilder } from '@angular/animations';

//IMPORT
import { Component } from '@angular/core';
//ANOTACION o DECORADOR
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//CLASE
// Un componente en angular son piezas de codigo que se pueden Anidar
// Por debajo implementa el patron composite
export class AppComponent {
  titulo = 'Bienvenido a Angular';
  curso:string='Curso Spring 5 con angular';
  profesor:string='Victor Cruz Gomez'
}
