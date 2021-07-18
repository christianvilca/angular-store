import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent {

  // automaticamente el componente recibira una propiedad desde otro componente
  @Input() product!: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  addCart() {
    console.log('añadir al carrito')
    // envio al padre
    this.productClicked.emit(this.product.id);
  }
}
