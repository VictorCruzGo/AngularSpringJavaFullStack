import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//IMPORTS COMPONENTES (Adicionar el nuevo componente)
import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes} from '@angular/router'; //rutas
import { HttpClientModule } from '@angular/common/http'; //CORS. En Java: JAX-RS Cliente, Java HTTP, Client Jersey
import { FormComponent } from './clientes/form.component'; 
import { FormsModule} from '@angular/forms';

//MAPEO DE RUTAS //rutas
const routes: Routes=[
  {path:'', redirectTo:'/clientes', pathMatch:'full'},
  {path:'directivas', component: DirectivaComponent},
  {path:'clientes',component: ClientesComponent},
  {path:'clientes/form', component:FormComponent},  //Mapeo de ruta al componente FormComponent
];

@NgModule({
  //DECLARACION DE COMPONENTES (Adicionar el nuevo componente)
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, //CORS. Agregar y registrar el modulo
    FormsModule, //Registrar modulo para trabajar con formularios
    RouterModule.forRoot(routes) //rutas
  ],
  //DECLARACION DE SERVICIO (Adicionar el nuevo servicio)
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
