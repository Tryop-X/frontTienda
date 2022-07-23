import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./seguridad/autenticacion/login/login.component";
import {RegistroUsuarioComponent} from "./seguridad/autenticacion/registro-usuario/registro-usuario.component";
import {ProdGuardService as guard} from "./seguridad/servicios/guards/prod-guard.service";
import {ListarUsuariosComponent} from "./seguridad/autenticacion/listar-usuarios/listar-usuarios.component";
import {ListarPendientesComponent} from "./tiendaVera/pendientes/listar-pendientes/listar-pendientes.component";

const routes: Routes = [


  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'listaUsuarios',
    component: ListarUsuariosComponent,
    canActivate: [guard],
    data: {expectedRol:['admin']},
  },
  {
    path: 'registro',
    component: RegistroUsuarioComponent,
    canActivate: [guard],
    data: {expectedRol:['admin']},
  },
  {
    path: 'tienda',
    canActivate: [guard],
    data: {expectedRol:['admin', 'user']},
    loadChildren: ()=>
    import('./tiendaVera/tiendaVera.module').then((m)=>m.TiendaVeraModule)

  },

  {
    path: '',
    canActivate: [guard],
    data: {expectedRol:['admin', 'user']},
    loadChildren: ()=>
      import('./home/home.module').then((m)=>m.HomeModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
