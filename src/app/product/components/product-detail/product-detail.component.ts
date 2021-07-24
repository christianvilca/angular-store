import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router'

import { ProductsService } from './../../../core/services/products/products.service';

import { Product } from '../../../core/models/product.model';
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
      this.fetchProduct(id)
      //this.product = this.productsService.getProduct(id)
    });
  }

  fetchProduct(id: string) {
    this.productsService.getProduct(id)
      .subscribe( product => {
        this.product = product;
      })
  }

  createProduct() {
    const newProduct: Product = {
      id: '222',
      title: 'Nuevo producto desde angular',
      image: 'assets/images/pin.png',
      "price": 3000,
      "description": "nuevo producto"
    }
    this.productsService.createProduct(newProduct)
    .subscribe( product => {
      console.log(product);
    })
  }

  updateProduct() {
    const udpateProduct: Partial<Product> = {
      "price": 50000,
      "description": "producto editado"
    }
    this.productsService.updateProduct('2', udpateProduct)
    .subscribe( product => {
      console.log(product);
    })
  }
  deleteProduct() {
    this.productsService.deleteProduct('19')
    .subscribe( result => {
      console.log(result);
    })
  }
}
