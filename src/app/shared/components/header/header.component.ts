import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators'

import { CartService } from './../../../core/services/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  total = 0;

  constructor(
    private cartService: CartService
  ) {
    this.cartService.cart$
    .pipe(
      map(products => products.length)
    )
    // ya no llega la lista de productos sino el total (llega transformado)
    .subscribe(total => {
      this.total = total
    })
  }

  ngOnInit(): void {
  }

}
