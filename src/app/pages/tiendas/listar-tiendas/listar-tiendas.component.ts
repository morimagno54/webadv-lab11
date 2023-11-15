import { Component, OnInit } from '@angular/core';
import { Tienda } from 'src/app/models/tienda'
import { TiendaService } from 'src/app/services/tienda.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listar-tiendas',
  templateUrl: './listar-tiendas.component.html',
  styleUrls: ['./listar-tiendas.component.css']
})
export class ListarTiendasComponent implements OnInit {
  listTiendas: Tienda[] = [];
  elementos: number = 0;
  
  constructor(private _tiendaService: TiendaService){

  }

  ngOnInit(): void{
    this.obtenerTiendas();
  }

  obtenerTiendas(){
    this._tiendaService.getTiendas().subscribe(data => {
      console.log(data);
      this.listTiendas = data;
      this.elementos = this.listTiendas.length;
    }) 
  }

  eliminarTienda(id: any){
    this._tiendaService.deleteTiendas(id).subscribe(data => {
      Swal.fire({
        title: 'Eliminacion de Tienda',
        text: "¿Desea eliminar la tienda?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(data);
          this.obtenerTiendas();
          this.elementos = this.listTiendas.length;
        }
      })
    })
  }

}
