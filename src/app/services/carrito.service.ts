import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrito } from '../models/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
    private apiUrl = 'http://localhost:8080/api/carrito';
  
    constructor(private http: HttpClient) { }
  
    getCarrito(): Observable<Carrito[]> {
      return this.http.get<Carrito[]>(this.apiUrl);
    }
  
    getCarritoById(id: number): Observable<Carrito> {
      return this.http.get<Carrito>(`${this.apiUrl}/${id}`);
    }
  
    createCarrito(categoria: Carrito): Observable<Carrito> {
      return this.http.post<Carrito>(this.apiUrl, categoria);
    }
  
    updateCarrito(categoria: Carrito, id: number): Observable<Carrito> {
      return this.http.put<Carrito>(`${this.apiUrl}/${id}`, categoria);
    }
  
    deleteCarrito(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
