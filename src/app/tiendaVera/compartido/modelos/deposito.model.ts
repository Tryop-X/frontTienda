import {Cuenta} from "./cuenta.model";

export class Deposito{
    idDeposito: number;
    horaDeposito: string;
    dniDepositante: string;
    estadoDeposito: string;
    dineroDepositar: number;
    nombreApuntador: string;
    vueltoDeposito: number;
    anotacionDeposito: string;
    cuenta: Cuenta;
}