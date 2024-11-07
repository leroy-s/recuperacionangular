import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ClienteComponent } from './cliente/cliente.component';
import { FacturaComponent } from './factura/factura.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'HOME'
    }
    ,
    {
        path: 'carrito',
        component: CarritoComponent,
        title: 'Componente de carritos'
    }
    ,
    {
        path: 'cliente',
        component:  ClienteComponent,
        title: 'Componente de clientes'
    }
    ,
    {
        path: 'factura',
        component:  FacturaComponent,
        title: 'Componente de facturas'
    }
    ,
    {
        path: '**',
        redirectTo :''
    }
];
