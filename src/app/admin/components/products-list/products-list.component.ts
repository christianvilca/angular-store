import { Component, OnInit } from '@angular/core';

import { ProductsService } from './../../../core/services/products/products.service'

import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id'];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
  }

  fetchProducts() {
    this.productsService.getAllProducts()
      .subscribe(products => {
        this.products = products;
      })
  }

}
