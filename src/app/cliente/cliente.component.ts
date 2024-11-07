import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/cliente.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
    FormsModule,
    ToastModule,
    MessageModule
  ],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  visible: boolean = false;
  cliente: Cliente = new Cliente();
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.listarClientes();
  }

  showDialog() {
    this.visible = true;
    this.cliente = new Cliente();
  }

  listarClientes() {
    this.clienteService.getCliente().subscribe(
      (data: Cliente[]) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Error al obtener clientes', error);
      }
    );
  }

  agregarCliente() {
    if (!this.cliente.nombres || !this.cliente.apellidos || !this.cliente.dni) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Todos los campos son obligatorios.',
      });
      return;
    }

    if (this.cliente.id === 0) {
      this.clienteService.createCliente(this.cliente).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Cliente registrado',
          });
          this.listarClientes();
          this.visible = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo agregar el cliente',
          });
        }
      });
    } else {
      this.clienteService.updateCliente(this.cliente, this.cliente.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Correcto',
            detail: 'Cliente actualizado',
          });
          this.listarClientes();
          this.visible = false;
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el cliente',
          });
        }
      });
    }
  }

  eliminarCliente(id: number) {
    this.clienteService.deleteCliente(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Cliente eliminado correctamente',
        });
        this.listarClientes();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el cliente',
        });
      }
    });
  }

  editarCliente(cliente: Cliente) {
    this.cliente = { ...cliente };
    this.visible = true;
  }
}
