import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { producto } from '../interfaces/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

	cargando = true;
	productos: producto[] = [];

  constructor( private http: HttpClient ) { 
  	this.cargarProductos();
  }

  private cargarProductos(){
  	this.http.get('https://angular-html-ab661.firebaseio.com/productos_idx.json')
  	.subscribe( (resp: producto[]) => { 
  		console.log(resp);
  		this.productos = resp;


  		setTimeout(() => {
  		this.cargando = false;
  		}, 2000);
  	});
  }



}
