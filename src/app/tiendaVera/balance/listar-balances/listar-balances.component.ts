import { Component, OnInit } from '@angular/core';
import {BalanceService} from "../../compartido/servicios/balance.service";
import {MatTableDataSource} from "@angular/material/table";
import Swal from "sweetalert2";
import {Balance} from "../../compartido/modelos/balance.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-balances',
  templateUrl: './listar-balances.component.html',
  styleUrls: ['./listar-balances.component.css']
})
export class ListarBalancesComponent implements OnInit {

  page=0;
  size=10;
  totalPage: Array<number>;

  panelOpenState= false;
  efectivo: number;
  cajaPiura: number;
  bancoNacion: number;
  saldoDia : number;
  vueltos :number;
  dineroPrestado: number;
  nuestrasDeudas: number;
  balance : Balance;
  primeraPagina: boolean;
  ultimaaPagina: boolean;

  displayedColumns: string[] = ['horaPagoCredito', 'saldoDia','saldoCajaPiura','saldoBN'
    ,'saldoEfectivo','nuestrasDeudas','dineroPrestado','vueltos',   'delete'];
  dataSource_balance: MatTableDataSource<Balance>;

  esValidoGuardar(){
    if(this.efectivo == undefined){
      return true
    }
    if(this.cajaPiura == undefined){
      return true;
    }
    if(this.bancoNacion == undefined){
      return true
    }
    return false;
  }
  setDinero(){
    this.servicioBalance.getDineroPrestado().subscribe(
        data => {
          this.dineroPrestado= this.redondeo(data);
        },
        error => {
          console.log(error)
        }
    )

    this.servicioBalance.getNuestrasDeudas().subscribe(
        data => {
          this.nuestrasDeudas = this.redondeo(data);
        },
        error => {
          console.log(error)
        }
    )

    this.servicioBalance.getVueltos().subscribe(
        data =>{
          this.vueltos = this.redondeo(data)
        },
        error => {
          console.log(error)
        }
    )
  }
  constructor(private servicioBalance: BalanceService, private router: Router) { }
  ngOnInit(): void {
    this.cargarBalanceByPag();
    this.setDinero()
  }
  getFecha(fecha: string){
    return fecha.split("T",1)[0]
  }
  guardar(){
    this.balance = new Balance();
    var v = this.vueltos.toFixed(2);
    this.balance.vueltos = this.vueltos;
    this.balance.dineroPrestado = this.dineroPrestado;
    this.balance.nuestrasDeudas = this.nuestrasDeudas;
    this.balance.saldoDia = this.saldoDia;
    this.balance.saldoBN = this.redondeo(this.bancoNacion);
    this.balance.saldoCajaPiura = this.redondeo(this.cajaPiura);
    this.balance.saldoEfectivo = this.redondeo(this.efectivo);


    console.log(this.balance)

    this.servicioBalance.guardarBalance(this.balance).subscribe(()=>{
          Swal.fire({
            icon: 'success',
            title: 'Balance guardado',
            showConfirmButton: false,
            timer: 1500
          })
          location.reload();
        },
        (error:any)=>{
          Swal.fire({
            title:"Balance no guardado",
            text:"Ha ocurrido un error al intentar crear este elemento’",
            icon:"error",
          })
        }
    )
  }
  redondeo(x: number): number{
    return Math.round((x + Number.EPSILON) * 100) / 100;
  }
  setSaldoDia(){
    var efec = this.efectivo;
    if(efec == undefined){
      efec =0;
    }
    var caja = this.cajaPiura;
    if(caja == undefined){
      caja = 0;
    }

    var banco =this.bancoNacion;
    if(banco == undefined){
      banco= 0;
    }

    var saldo = efec+ caja + banco - this.vueltos - this.nuestrasDeudas + this.dineroPrestado;


    this.saldoDia = this.redondeo(saldo);
  }
  getSaldoDia(){
    this.setSaldoDia()
    return this.saldoDia;
  }
  deleteBalance(id: number) {
    console.log("id:" + id)
    Swal.fire({
      title: 'Estas Seguro',
      text:'Esto no se puede deshacer',
      icon:'question',
      showCancelButton:true,
      confirmButtonText:'Si, Borrarlo',
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',

    }).then(respuesta => {
      if(respuesta.value){
        this.servicioBalance.eliminarBalance(id).subscribe(() => {
          this.ngOnInit();
          Swal.fire({
            icon: 'success',
            title: 'Se ha eliminado',
            showConfirmButton: false,
            timer: 1500
          })
        },(error:any)=>{
          Swal.fire({
            title:"No se ha podido borrar",
            text:"Error’",
            icon:"error",
          })
        })
      }

    })
  }
  cargarBalanceByPag(){
    this.servicioBalance.getBalancesByPag(this.page, this.size).subscribe(
        data => {
          this.dataSource_balance = new MatTableDataSource<Balance>(data.content);
          this.primeraPagina = data.first;
          this.ultimaaPagina = data.last;
          this.totalPage = new Array<number>(data['totalPages']);
        },
        error => {
          console.log(error)
        }
    )
  }
  cargarAnterior(){
    if(!this.primeraPagina){
      this.page --;
      this.cargarBalanceByPag();
    }
  }
  cargarSiguiente(){
    if(!this.ultimaaPagina){
      this.page ++;
      this.cargarBalanceByPag();
    }
  }
  cargarByNumPag(nPage: number){
    this.page = nPage;
    this.cargarBalanceByPag();
  }

}
