import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore  } from '@angular/fire/firestore';

import { Product } from './../../../core/models/product.model'
import { CartService } from './../../../core/services/cart.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$!: Observable<Product[]>

  constructor(
    private cartService: CartService
  ) {
    // escucha continua de los productos que se estan agregando al carrito
    this.products$ = this.cartService.cart$
  }

  ngOnInit(): void {
  }

}
