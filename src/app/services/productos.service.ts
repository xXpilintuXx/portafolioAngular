import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { producto } from '../interfaces/producto-interface';
import { ProductoDescripcion } from '../interfaces/producto-descripcion-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

	cargando = true;
	productos: producto[] = [];
  productosInfo: ProductoDescripcion;
  productosFiltrado :producto[] = [];

  constructor( private http: HttpClient ) { 
  	this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise(( resolve, reject ) =>{
      this.http.get('https://angular-html-ab661.firebaseio.com/productos_idx.json')
    .subscribe( (resp: producto[]) => { 
      this.productos = resp;
      setTimeout(() => {
        this.cargando = false;
        }, 2000);
        resolve();
      });
    })

  	
  }


  getProducto( id: string ){
    return this.http.get(`https://angular-html-ab661.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string){


    if (this.productos.length === 0){
      this.cargarProductos().then(() =>{
        this.filtrarProductos( termino );
      });
    } else {
      this.filtrarProductos( termino );
    }
    
  }

  private filtrarProductos(termino: string){
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod =>{
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0){
        this.productosFiltrado.push( prod );
      }

    });

  }
}
