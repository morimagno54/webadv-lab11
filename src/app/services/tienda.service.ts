import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Tienda } from '../models/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  url = 'http://localhost:4000/api/tiendas/';

  constructor(private http: HttpClient) { 

  }

  getTiendas(): Observable<any> {
    return this.http.get(this.url).pipe(
      tap((data: any) => console.log('Datos de tiendas:', data)),
      catchError(error => {
        console.error('Error al obtener tiendas:', error);
        throw error;
      })
    );
  }

  deleteTiendas(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  guardarTienda(tienda: Tienda): Observable<any> {
    return this.http.post(this.url, tienda);
  }

  viewTienda(id?: string): Observable<any> {
    return this.http.get(this.url + id)
  }

  actualizarTienda(id: string, tienda: Tienda): Observable<any> {
    return this.http.put(this.url + id, tienda);
  }
}
