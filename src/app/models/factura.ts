import { Carrito } from './carrito';
import { Cliente } from './cliente';

export class Factura {
    id: number;
    carrito: Carrito; 
    cliente: Cliente;
    constructor(id: number = 0, carrito: Carrito = new Carrito(),cliente: Cliente = new Cliente()) {
        this.id = id;
        this.carrito = carrito;
        this.cliente = cliente;
    }
}
