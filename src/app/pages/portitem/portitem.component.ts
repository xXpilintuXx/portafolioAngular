import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService} from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion-interface';

@Component({
  selector: 'app-portitem',
  templateUrl: './portitem.component.html',
  styleUrls: ['./portitem.component.css']
})
export class PortitemComponent implements OnInit {

	producto: ProductoDescripcion;
	id: string;

  constructor( private route: ActivatedRoute, 
  	public productoService: ProductosService ) { }

  ngOnInit() {
  	this.route.params.subscribe(
  		parametros => {
  			this.productoService.getProducto(parametros['id']).subscribe( (producto: ProductoDescripcion) => {
  				this.id = parametros['id'];
  				this.producto = producto;
  			});
  		});

  }

}
