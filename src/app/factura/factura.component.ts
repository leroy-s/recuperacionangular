import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Factura } from '../models/factura';
import { FacturaService } from '../services/factura.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { CarritoService } from '../services/carrito.service';
import { Carrito } from '../models/carrito';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    MessageModule,
    DropdownModule
  ],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  visible: boolean = false;
  factura: Factura = new Factura();
  facturas: Factura[] = [];
  carritos: Carrito[] = []; // Lista de carritos
  clientes: Cliente[] = []; // Lista de clientes

  constructor(
    private facturaService: FacturaService,
    private carritoService: CarritoService,
    private clienteService: ClienteService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listarFacturas();
    this.cargarCarritos();
    this.cargarClientes();
  }

  showDialog() {
    this.visible = true;
    this.factura = new Factura();
  }

  listarFacturas() {
    this.facturaService.getFactura().subscribe(
      (data: Factura[]) => {
        this.facturas = data;
        console.log("Facturas obtenidas:", data); // Depuración
      },
      (error) => {
        console.error('Error al obtener facturas', error);
      }
    );
  }

  cargarCarritos() {
    this.carritoService.getCarrito().subscribe(
      (data: Carrito[]) => {
        this.carritos = data;
      },
      (error) => {
        console.error('Error al obtener carritos', error);
      }
    );
  }

  cargarClientes() {
    this.clienteService.getCliente().subscribe(
      (data: Cliente[]) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Error al obtener clientes', error);
      }
    );
  }

  agregarFactura() {
    if (!this.factura.carrito || !this.factura.cliente) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Carrito y Cliente son obligatorios.',
      });
      return;
    }

    if (this.factura.id === 0) {
      this.facturaService.createFactura(this.factura).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Factura registrada',
          });
          this.listarFacturas();
          this.visible = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo agregar la factura',
          });
        }
      });
    } else {
      this.facturaService.updateFactura(this.factura, this.factura.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Factura actualizada',
          });
          this.listarFacturas();
          this.visible = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar la factura',
          });
        }
      });
    }
  }

  eliminarFactura(id: number) {
    if (id > 0) {
      this.facturaService.deleteFactura(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Factura eliminada correctamente',
          });
          this.listarFacturas();
        },
        error: (err) => {
          console.error('Error al eliminar factura:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar la factura',
          });
        }
      });
    }
  }

  editarFactura(factura: Factura) {
    this.factura = { ...factura };
    this.visible = true;
  }
}
