import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaVeraRoutingModule } from './tiendaVera-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NewHistoriaComponent } from './historia/new-historia/new-historia.component';
import { EditHistoriaComponent } from './historia/edit-historia/edit-historia.component';
import { ListHistoriaComponent } from './historia/list-historia/list-historia.component';
import { MaterialModule } from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormHistoriaComponent } from './historia/shared/form-historia/form-historia.component';
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import { ListarPendientesComponent } from './pendientes/listar-pendientes/listar-pendientes.component';
import { ListarBalancesComponent } from './balance/listar-balances/listar-balances.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { DialogDepositoComponent } from './pendientes/pagar-pendientes/dialog-deposito/dialog-deposito.component';
import { DialogDeudaComponent } from './pendientes/pagar-pendientes/dialog-deuda/dialog-deuda.component';
import { DialogPagoCreditoComponent } from './pendientes/pagar-pendientes/dialog-pago-credito/dialog-pago-credito.component';
import { DialogPagoServicioComponent } from './pendientes/pagar-pendientes/dialog-pago-servicio/dialog-pago-servicio.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NewHistoriaComponent,
    EditHistoriaComponent,
    ListHistoriaComponent,
    FormHistoriaComponent,
    ListarPendientesComponent,
    ListarBalancesComponent,
    DialogDepositoComponent,
    DialogDeudaComponent,
    DialogPagoCreditoComponent,
    DialogPagoServicioComponent,
  ],
  entryComponents:[
    DialogDeudaComponent,
    DialogPagoCreditoComponent,
    DialogPagoServicioComponent,
  ],
  imports: [
    CommonModule,
    TiendaVeraRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatDividerModule,
    MatExpansionModule
  ]
})
export class TiendaVeraModule { }
