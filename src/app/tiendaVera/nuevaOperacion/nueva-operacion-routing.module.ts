import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NuevoPagoServicioComponent} from "./nuevo-pago-servicio/nuevo-pago-servicio.component";
import {NuevoPagoCreditoComponent} from "./nuevo-pago-credito/nuevo-pago-credito.component";
import {NuevaDeudaComponent} from "./nueva-deuda/nueva-deuda.component";
import {NuevoDepositoComponent} from "./nuevo-deposito/nuevo-deposito.component";
import {LayoutComponent} from "./layout/layout.component";


const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'deposito',
        component: NuevoDepositoComponent,
      },
      {
        path: 'deuda',
        component: NuevaDeudaComponent,
      },
      {
        path: 'pagoCredito',
        component: NuevoPagoCreditoComponent,
      },
      {
        path:'pagoServicio',
        component: NuevoPagoServicioComponent
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevaOperacionRoutingModule { }
