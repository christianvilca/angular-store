import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router'

import { ProductsService } from './../core/services/products/products.service';

import { Product } from './../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  // variable publica del componente para que llegue al template
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    // escucha los cambios que hay en los parametros
    this.route.params.subscribe((params: Params) => {
      const id = params.id
      this.product = <Product>this.productsService.getProduct(id);
    });
  }

}
