import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {interceptorProvider} from "./seguridad/servicios/interceptors/prod-interceptor.service";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// @ts-ignore
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import {MaterialModule} from "./material/material.module";
import { LoginComponent } from './seguridad/autenticacion/login/login.component';
import { RegistroUsuarioComponent } from './seguridad/autenticacion/registro-usuario/registro-usuario.component';
import {FormsModule} from "@angular/forms";
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ListarUsuariosComponent } from './seguridad/autenticacion/listar-usuarios/listar-usuarios.component';
import { SumarBilletesComponent } from './toolbar/sumar-billetes/sumar-billetes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    ToolbarComponent,
    ListarUsuariosComponent,
    SumarBilletesComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FontAwesomeModule,
        MaterialModule,
        FormsModule,
        MatSlideToggleModule,
    ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
