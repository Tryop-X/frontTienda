import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevaOperacionRoutingModule } from './nueva-operacion-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NuevaDeudaComponent } from './nueva-deuda/nueva-deuda.component';
import { NuevoDepositoComponent } from './nuevo-deposito/nuevo-deposito.component';
import { NuevoPagoCreditoComponent } from './nuevo-pago-credito/nuevo-pago-credito.component';
import { NuevoPagoServicioComponent } from './nuevo-pago-servicio/nuevo-pago-servicio.component';
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    LayoutComponent,
    NuevaDeudaComponent,
    NuevoDepositoComponent,
    NuevoPagoCreditoComponent,
    NuevoPagoServicioComponent
  ],
    imports: [
        CommonModule,
        NuevaOperacionRoutingModule,
        MaterialModule,
        FormsModule,
        MatSlideToggleModule,
        ReactiveFormsModule
    ]
})
export class NuevaOperacionModule { }
