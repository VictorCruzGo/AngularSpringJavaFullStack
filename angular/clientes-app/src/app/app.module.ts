import { CommonModule} from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

//IMPORTS COMPONENTES (Adicionar el nuevo componente)
import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes} from '@angular/router'; //Rutas.
import { HttpClientModule } from '@angular/common/http'; //CORS. En Java: JAX-RS Cliente, Java HTTP, Client Jersey.

import { FormsModule} from '@angular/forms';
import localES from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//Formato de fecha en ES
registerLocaleData(localES,'es')

//MAPEO DE RUTAS //rutas.
//Las rutas definicias redireccion al componente.
const routes: Routes=[
  {path:'', redirectTo:'/clientes', pathMatch:'full'},
  {path:'directivas', component: DirectivaComponent},
  {path:'clientes',component: ClientesComponent},
  {path:'clientes/page/:page',component: ClientesComponent},
  {path:'clientes/form', component:FormComponent},  //Mapeo de ruta al componente FormComponent.
  {path:'clientes/form/:id', component:FormComponent}
];

@NgModule({
  //DECLARACION DE COMPONENTES (Adicionar el nuevo componente).
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule, //CORS. Agregar y registrar el modulo.
    FormsModule, //Registrar modulo para trabajar con formularios.
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  //DECLARACION DE SERVICIO (Adicionar el nuevo servicio).
  providers: [ClienteService ,{provide: LOCALE_ID, useValue:'es'},MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
