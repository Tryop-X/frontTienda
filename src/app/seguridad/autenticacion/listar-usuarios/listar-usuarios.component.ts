import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Usuario} from "../../modelos/usuario";
import {UsuariosService} from "../../servicios/usuarios.service";
import {Balance} from "../../../tiendaVera/compartido/modelos/balance.model";

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['idUsuario', 'username', 'rol', 'delete'];
  dataSource_usuarios: MatTableDataSource<Usuario>;

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.cargarUsuarios()
  }

  cargarUsuarios(){
    this.usuarioService.getUsuarios().subscribe(
        data => {this.dataSource_usuarios = new MatTableDataSource<Usuario>(data)
            },
        error => {
          console.log(error)
        }
    );
  }

  delete(idUSuario: number) {
    this.usuarioService.borrarUsuarioByID(idUSuario).subscribe(()=>{
      console.log("exito")
    },error => {
      console.log(error)
    })
  }

  getRol(roles: string[]) {
    var rolActual='user';
    if(roles.length>1){
      rolActual='admin';
    }
    return rolActual;
  }
}
