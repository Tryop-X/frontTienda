import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PagoCredito} from "../../../compartido/modelos/pagoCredito.model";
import {PagoCreditoService} from "../../../compartido/servicios/pago-credito.service";
import {Router} from "@angular/router";
import {Alertas} from "../../../compartido/alertas/alertas";
import {PagoServicio} from "../../../compartido/modelos/pagoServicio.model";
import {PagoServicioService} from "../../../compartido/servicios/pago-servicio.service";

@Component({
  selector: 'app-dialog-pago-servicio',
  templateUrl: './dialog-pago-servicio.component.html',
  styleUrls: ['./dialog-pago-servicio.component.css']
})
export class DialogPagoServicioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public pagoServicio: PagoServicio,
              private pServicioService: PagoServicioService,
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
    return this.pagoServicio.anotacionPagoServicio != "";
  }

  actualizarOperacion() {
    Alertas.smsConfirmar("Ten en cuenta","tomar una foto siempre evitará problemas a futuro").then(respuesta =>{
      if(respuesta.value){
        this.actualizarPagoCredito()
      }
    })
  }

  actualizarPagoCredito(){
    this.pagoServicio.estadoPagoServicio = "pagado";
    this.pServicioService.actualizarPagoServicio(this.pagoServicio).subscribe(()=>{
      this.router.navigate(['/tienda/pendientes']).then(r => location.reload());
    }, error => {
      Alertas.smsError("No actualizado :c", "Conexión pérdida con el servidor")
    })
  }
  anularOperacion() {
    Alertas.smsConfirmar("¿Estás seguro?","Quieres anular esta operación").then(respuesta =>{
      if(respuesta.value){
        this.anulacion()
      }
    })
  }

  anulacion(){
    this.pagoServicio.estadoPagoServicio = "cancelado"
    this.pServicioService.actualizarPagoServicio(this.pagoServicio).subscribe(()=>{
      this.router.navigate(['/tienda/pendientes']).then(r => location.reload());
    }, error => {
      Alertas.smsError("No actualizado :c", "Conexión perdida con la base de datos")
    })
  }

}
