import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from './../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = []
  private cart = new BehaviorSubject<Product[]>([])

  cart$ = this.cart.asObservable();

  constructor() { }

  addCart(product: Product){
    this.products = [...this.products, product]
    // notifica a todos los componentes que estan suscriptos que hubo un cambio (algo se agrego al carrito)
    this.cart.next(this.products)
  }
}
