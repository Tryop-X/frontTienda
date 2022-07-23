import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Deuda} from "../../../compartido/modelos/deuda.model";
import {DeudaService} from "../../../compartido/servicios/deuda.service";
import {Router} from "@angular/router";
import {Alertas} from "../../../compartido/alertas/alertas";
import {PagoCredito} from "../../../compartido/modelos/pagoCredito.model";
import {PagoCreditoService} from "../../../compartido/servicios/pago-credito.service";

@Component({
  selector: 'app-dialog-pago-credito',
  templateUrl: './dialog-pago-credito.component.html',
  styleUrls: ['./dialog-pago-credito.component.css']
})
export class DialogPagoCreditoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public pagoCredito: PagoCredito,
              private pCreditoService: PagoCreditoService,
              private router: Router) { }

  ngOnInit(): void {
  }

  getFecha(fecha: string){
    return fecha.split("T",1)[0]
  }

  getHora(fecha: string){
    return fecha.split("T",2)[1].split('.',1)[0]
  }

  notaVacia() {
    return this.pagoCredito.anotacionPagoCredito != "";
  }

  actualizarOperacion() {
    Alertas.smsConfirmar("Ten en cuenta","tomar una foto siempre evitará problemas a futuro").then(respuesta =>{
      if(respuesta.value){
        this.actualizarPagoCredito()
      }
    })
  }

  actualizarPagoCredito(){
    this.pagoCredito.estadoPagoCredito = "pagado";
    this.pCreditoService.actualizarPagoCredito(this.pagoCredito).subscribe(()=>{
      this.router.navigate(['/tienda/pendientes']).then(r => location.reload());
    }, error => {
      Alertas.smsError("No actualizado :c", "Conexión pérdida con el servidor")
    })
  }

  anularOperacion() {
    Alertas.smsConfirmar("Estás seguro?","Quieres anular esta operación").then(respuesta =>{
      if(respuesta.value){
        this.anulacion()
      }
    })
  }

  anulacion(){
    this.pagoCredito.estadoPagoCredito = "cancelado"
    this.pCreditoService.actualizarPagoCredito(this.pagoCredito).subscribe(()=>{
      this.router.navigate(['/tienda/pendientes']).then(r => location.reload());
    }, error => {
      Alertas.smsError("No actualizado :c", "Conexión perdida con la base de datos")
    })
  }

}
