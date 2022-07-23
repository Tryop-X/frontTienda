import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Deuda} from "../../../compartido/modelos/deuda.model";
import {DeudaService} from "../../../compartido/servicios/deuda.service";
import {Alertas} from "../../../compartido/alertas/alertas";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-deuda',
  templateUrl: './dialog-deuda.component.html',
  styleUrls: ['./dialog-deuda.component.css']
})
export class DialogDeudaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public deuda: Deuda,
              private deudaService: DeudaService,
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
    if(this.deuda.anotacionDeuda==""){
      return false;
    }
    return true;
  }

  actualizarOperacion() {
    Alertas.smsConfirmar("Ten en cuenta","tomar una foto siempre evitará problemas a futuro").then(respuesta =>{
      if(respuesta.value){
        this.guardarDeuda()
      }
    })
  }

  guardarDeuda(){
    this.deuda.estadoDeuda = "pagado";
    this.deudaService.actualizarDeuda(this.deuda).subscribe(()=>{
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
    this.deuda.estadoDeuda = "cancelado"
    this.deudaService.actualizarDeuda(this.deuda).subscribe(()=>{
      this.router.navigate(['/tienda/pendientes']).then(r => location.reload());
    }, error => {
      Alertas.smsError("No actualizado :c", "Conexión perdida con la base de datos")
    })
  }


}
