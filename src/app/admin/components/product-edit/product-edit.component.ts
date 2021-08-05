import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyValidators } from './../../../utils/validators';

import { ProductsService } from './../../../core/services/products/products.service'


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form!: FormGroup;
  id!: string

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
    this.form.valueChanges
      .subscribe(() =>{
        console.log(this.form.valid);
      })
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params)=>{
        this.id = params.id
        this.productsService.getProduct(this.id)
          .subscribe( product =>{
            this.form.patchValue(product)
          })
      })
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
        .subscribe(result =>{
          console.log(result)
          this.router.navigate(['./admin/products'])
        })
    }
    //console.log(this.form.value);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description:['', [Validators.required]],
    })
  }

  get priceField() {
    return this.form.get('price')
  }

}
