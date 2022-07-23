import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosRoutingModule } from './datos-routing.module';
import { ListarCreditosComponent } from './listar-creditos/listar-creditos.component';
import { ListarCuentasComponent } from './listar-cuentas/listar-cuentas.component';
import { ListarServiciosComponent } from './listar-servicios/listar-servicios.component';
import { ListarPagoServiciosComponent } from './listar-pago-servicios/listar-pago-servicios.component';
import { ListarPagoCreditosComponent } from './listar-pago-creditos/listar-pago-creditos.component';
import { ListarDeudasComponent } from './listar-deudas/listar-deudas.component';
import { ListarDepositosComponent } from './listar-depositos/listar-depositos.component';
import { LayoutComponent } from './layout/layout.component';
import {MaterialModule} from "../../material/material.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListarCreditosComponent,
    ListarCuentasComponent,
    ListarServiciosComponent,
    ListarPagoServiciosComponent,
    ListarPagoCreditosComponent,
    ListarDeudasComponent,
    ListarDepositosComponent,
    LayoutComponent
  ],
    imports: [
        CommonModule,
        DatosRoutingModule,
        MaterialModule,
        FormsModule
    ]
})
export class DatosModule { }
