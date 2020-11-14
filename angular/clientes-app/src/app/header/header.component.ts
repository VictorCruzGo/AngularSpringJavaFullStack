//MODULOS
import { Component } from '@angular/core';
//ANOTACION O DECORADOR
//En Angular de forma generica se utiliza @Component
@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
//CLASE
export class HeaderComponent{
  //ATRIBUTOS
    titulo:string='App-Angular';
}