import {Credito} from "./credito.model";

export class PagoCredito{
    idPagoCredito: number;
    horaPagoCredito: string;
    estadoPagoCredito: string;
    vueltoPagoCredito: number;
    anotacionPagoCredito: string;
    nombreApuntador: string;
    credito: Credito;
}
