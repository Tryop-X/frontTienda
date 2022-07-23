import {Component, OnInit, Optional} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Deposito} from "../../compartido/modelos/deposito.model";
import {DepositoService} from "../../compartido/servicios/deposito.service";
import {PagoCreditoService} from "../../compartido/servicios/pago-credito.service";
import {PagoServicioService} from "../../compartido/servicios/pago-servicio.service";
import {DeudaService} from "../../compartido/servicios/deuda.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogDepositoComponent} from "../pagar-pendientes/dialog-deposito/dialog-deposito.component";
import {Alertas} from "../../compartido/alertas/alertas";
import {PagoCredito} from "../../compartido/modelos/pagoCredito.model";
import {PagoServicio} from "../../compartido/modelos/pagoServicio.model";
import {Deuda} from "../../compartido/modelos/deuda.model";
import {DialogPagoCreditoComponent} from "../pagar-pendientes/dialog-pago-credito/dialog-pago-credito.component";
import {DialogPagoServicioComponent} from "../pagar-pendientes/dialog-pago-servicio/dialog-pago-servicio.component";
import {DialogDeudaComponent} from "../pagar-pendientes/dialog-deuda/dialog-deuda.component";

@Component({
  selector: 'app-listar-pendientes',
  templateUrl: './listar-pendientes.component.html',
  styleUrls: ['./listar-pendientes.component.css']
})
export class ListarPendientesComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'nombre', 'cantidad', 'realizar']

  dataSource_depositos: MatTableDataSource<Deposito>;
  dataSource_pagoCreditos: MatTableDataSource<PagoCredito>;
  dataSource_pagoServicios: MatTableDataSource<PagoServicio>;
  dataSource_deudas: MatTableDataSource<Deuda>;
  private ancho = '55%';
  private alto = '70%';
  hayDepositos = false;
  hayPagosServicio = false;
  hayPagoCredito= false;
  hayDeudas = false;


  constructor(
      private depositoService: DepositoService,
      private pagoCreditoService: PagoCreditoService,
      private pagoServicioService: PagoServicioService,
      private deudaService: DeudaService,
      public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarDepositosPendientes()
    this.cargarPCreditosPendientes()
    this.cargarPServiciosPendientes()
    this.cargarDeudas()
  }

  getFecha(fecha: string){
    return fecha.split("T",1)[0]
  }

  cargarDeudas(){
    this.deudaService.getDeudasndientes().subscribe(
        data=>{
          this.dataSource_deudas = new MatTableDataSource<Deuda>(data);
          if(data.length>0){
            this.hayDeudas = true;
          }
        }, erros=>{
          Alertas.smsError("Error deudas","No se podido cargar la informaci\u00F3n")
        }
    )
  }

  cargarPCreditosPendientes(){
    this.pagoCreditoService.getPagoCreditosPendientes().subscribe(data=>{
      this.dataSource_pagoCreditos = new MatTableDataSource<PagoCredito>(data);
      if(data.length>0){
        this.hayPagoCredito = true;
      }
    }, error =>{
      Alertas.smsError("Error pago Servicio","No se podido cargar la informaci\u00F3n")
    })
  }

  cargarPServiciosPendientes(){
    this.pagoServicioService.getPagoServicioPendientes().subscribe(
        data =>{
          this.dataSource_pagoServicios = new MatTableDataSource<PagoServicio>(data);
          if(data.length>0){
            this.hayPagosServicio = true;
          }
        }, error =>{
          Alertas.smsError("Error pago Servicio","No se podido cargar la informaci\u00F3n")
        }
    )
  }

  cargarDepositosPendientes(){
      this.depositoService.getDepositosPendiente().subscribe( data=>{
        this.dataSource_depositos = new MatTableDataSource(data);
        if(data.length>0){
          this.hayDepositos = true;
        }
      }, error=>{
        Alertas.smsError('Error dep\u00F3sito','No se ha podido cargar la informaci\u00F3n')
      })
  }
  openDeposito(idDeposito: number) {
    this.depositoService.getDepositoByID(idDeposito).subscribe(data=>{
      this.dialog.open(DialogDepositoComponent, {
        width : this.ancho,
        height: this.alto,
        data: data
      });
    }, error => {
      Alertas.smsError("Error al cargar","No hay conexión con la base de datos")
    })
  }


  openPagoCredito(idPagoCredito: number) {
    this.pagoCreditoService.getCreditoByID(idPagoCredito).subscribe(data=>{
      this.dialog.open(DialogPagoCreditoComponent, {
        width : this.ancho,
        height: this.alto,
        data: data
      });
    }, error => {
      Alertas.smsError("Error al cargar","No hay conexión con la base de datos")
        }
    )
  }

  openDeuda(idDeuda: number) {
    this.deudaService.getDeudaByID(idDeuda).subscribe(data=>{
      this.dialog.open(DialogDeudaComponent, {
        width : this.ancho,
        height: this.alto,
        data: data
      });
    }, error => {
          Alertas.smsError("Error al cargar","No hay conexión con la base de datos")
        }
    )
  }

  openPagoServicio(idPagoServicio: number) {
    this.pagoServicioService.getPagoServicioByID(idPagoServicio).subscribe(data=>{
      this.dialog.open(DialogPagoServicioComponent, {
        width : this.ancho,
        height: this.alto,
        data: data
      });
    }, error => {
      Alertas.smsError("Error al cargar","No hay conexión con la base de datos")
    })
  }
}
