import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Deposito} from "../../../compartido/modelos/deposito.model";
import {DepositoService} from "../../../compartido/servicios/deposito.service";
import {Alertas} from "../../../compartido/alertas/alertas";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-deposito',
  templateUrl: './dialog-deposito.component.html',
  styleUrls: ['./dialog-deposito.component.css']
})
export class DialogDepositoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public deposito: Deposito,
              private depositoService: DepositoService,
              private router: Router) { }

  ngOnInit(): void {
  }

  getFecha(fecha: string){
    return fecha.split("T",1)[0]
    //return "-->fecha"
  }

  getHora(fecha: string){
    return fecha.split("T",2)[1].split('.',1)[0]
    //return "-->hora"
  }

  notaVacia() {
    if(this.deposito.anotacionDeposito==""){
      return false;
    }
    return true;
  }

  actualizarOperacion() {
    Alertas.smsConfirmar("Ten en cuenta","tomar una foto siempre evitará problemas a futuro").then(respuesta =>{
      if(respuesta.value){
        this.guardarDeposito()
      }
    })
  }

  guardarDeposito() {
    this.deposito.estadoDeposito = "pagado"
    this.depositoService.actualizarDeposito(this.deposito).subscribe(()=>{
      this.router.navigate(['/tienda/pendientes']).then(r => location.reload());
    }, error => {
      Alertas.smsError("No actualizado :c", "Conexión perdida con la base de datos")
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
      this.deposito.estadoDeposito = "cancelado"
      this.depositoService.actualizarDeposito(this.deposito).subscribe(()=>{
        this.router.navigate(['/tienda/pendientes']).then(r => location.reload());
      }, error => {
        Alertas.smsError("No actualizado :c", "Conexión perdida con la base de datos")
      })
    }
}
