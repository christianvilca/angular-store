import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators'

import { CartService } from './../../../core/services/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // hacemos que total sea un observable
  total$!: Observable<number>;

  constructor(
    private cartService: CartService
  ) {
    // ya no nos suscribimos
    // Estamos guardando el valor en un observable (flujo de datos que va estar vivo)
    // vamos a suscribirnos pero desde el template
    this.total$ = this.cartService.cart$
    .pipe(
      map(products => products.length)
    )
    // no quiere suscribirme sino evaluar una suscripcion
  }

  ngOnInit(): void {
  }

}
