import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Carrito } from '../models/carrito';
import { CarritoService } from '../services/carrito.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-carrito',
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
    MessageModule
  ],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  visible: boolean = false;
  carrito: Carrito = new Carrito();
  carritos: Carrito[] = [];

  constructor(
    private carritoService: CarritoService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listarCarritos();
  }

  showDialog() {
    this.visible = true;
    this.carrito = new Carrito();
  }

  listarCarritos() {
    this.carritoService.getCarrito().subscribe(
      (data: Carrito[]) => {
        this.carritos = data;
        console.log("Carritos obtenidos:", data); // Depuración
      },
      (error) => {
        console.error('Error al obtener carritos', error);
      }
    );
  }

  agregarCarrito() {
    if (!this.carrito.articulo || !this.carrito.precio || this.carrito.cantidad <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todos los campos son obligatorios.',
      });
      return;
    }

    if (this.carrito.id === 0) {
      this.carritoService.createCarrito(this.carrito).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Carrito registrado',
          });
          this.listarCarritos();
          this.visible = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo agregar el carrito',
          });
        }
      });
    } else {
      this.carritoService.updateCarrito(this.carrito, this.carrito.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Carrito actualizado',
          });
          this.listarCarritos();
          this.visible = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el carrito',
          });
        }
      });
    }
  }

  eliminarCarrito(id: number) {
    if (id > 0) {
      this.carritoService.deleteCarrito(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Carrito eliminado correctamente',
          });
          this.listarCarritos();
        },
        error: (err) => {
          console.error('Error al eliminar carrito:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el carrito',
          });
        }
      });
    }
  }

  editarCarrito(carrito: Carrito) {
    this.carrito = { ...carrito };
    this.visible = true;
  }
}
