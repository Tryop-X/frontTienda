import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {ListarCreditosComponent} from "./listar-creditos/listar-creditos.component";
import {ListarCuentasComponent} from "./listar-cuentas/listar-cuentas.component";
import {ListarDepositosComponent} from "./listar-depositos/listar-depositos.component";
import {ListarDeudasComponent} from "./listar-deudas/listar-deudas.component";
import {ListarPagoCreditosComponent} from "./listar-pago-creditos/listar-pago-creditos.component";
import {ListarPagoServiciosComponent} from "./listar-pago-servicios/listar-pago-servicios.component";
import {ListarServiciosComponent} from "./listar-servicios/listar-servicios.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'creditos',
        component: ListarCreditosComponent
      },
      {
        path: 'cuentas',
        component: ListarCuentasComponent
      },
      {
        path: 'deudas',
        component: ListarDeudasComponent
      },
      {
        path: 'depositos',
        component: ListarDepositosComponent
      },      {
        path: 'pagos-credito',
        component: ListarPagoCreditosComponent
      },      {
        path: 'pagos-servicio',
        component: ListarPagoServiciosComponent
      },      {
        path: 'servicios',
        component: ListarServiciosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosRoutingModule { }
