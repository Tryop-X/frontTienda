import {Servicio} from "./servicio.model";

export class PagoServicio{
    idPagoServicio?: number;
    horaPagoServicio: string;
    estadoPagoServicio: string;
    vueltoPagoServicio: number;
    nombreApuntador: string;
    anotacionPagoServicio: string;
    servicio : Servicio
}