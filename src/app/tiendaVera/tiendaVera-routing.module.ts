import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {ListHistoriaComponent} from "./historia/list-historia/list-historia.component";
import {NewHistoriaComponent} from "./historia/new-historia/new-historia.component";
import {EditHistoriaComponent} from "./historia/edit-historia/edit-historia.component";
import {ListarBalancesComponent} from "./balance/listar-balances/listar-balances.component";
import {ListarPendientesComponent} from "./pendientes/listar-pendientes/listar-pendientes.component";

const routes: Routes = [
  {
    path: 'nuevaOperacion',
    loadChildren: ()=>import('./nuevaOperacion/nueva-operacion.module')
        .then((m)=>m.NuevaOperacionModule)
  },
  {
    path: 'datos',
    loadChildren: ()=>import('./datos/datos.module')
        .then((m)=>m.DatosModule)
  },
  {
    path: 'pendientes',
    component: ListarPendientesComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'carreras',
        component: ListHistoriaComponent,
      },
      {
        path: 'carreras/new',
        component: NewHistoriaComponent,
      },
      {
        path: 'carreras/:id/editar',
        component: EditHistoriaComponent,
      },
    ],
  },
  {
    path: 'balance',
    component : ListarBalancesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaVeraRoutingModule { }
