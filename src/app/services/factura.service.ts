import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = 'http://localhost:8080/api/factura';

  constructor(private http: HttpClient) { }

  getFactura(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.apiUrl);
  }

  getFacturaById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }

  createFactura(categoria: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.apiUrl, categoria);
  }

  updateFactura(categoria: Factura, id: number): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteFactura(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
