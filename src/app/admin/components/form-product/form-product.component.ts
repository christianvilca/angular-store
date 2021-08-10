import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from './../../../utils/validators';
import { AngularFireStorage } from '@angular/fire/storage'

import { finalize } from 'rxjs/operators'

import { ProductsService } from './../../../core/services/products/products.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form!: FormGroup;
  image$!: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
    this.form.valueChanges
      .subscribe(() =>{
        console.log(this.form.valid);
      })
  }

  ngOnInit(): void {
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product)
        .subscribe(result =>{
          console.log(result)
          this.router.navigate(['./admin/products'])
        })
    }
    //console.log(this.form.value);
  }

  uploadFile(event: any) {
    const file = event.target.files[0]
    // nombre del archivo
    const name = 'image.png'
    const fileRef = this.storage.ref(name)
    const task = this.storage.upload(name, file)

    // Permite saber cuando finaliza y cuando no
    task.snapshotChanges()
      // Como es un observable lo puedo procesar con un pipe
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL()
          this.image$.subscribe( url => {
            console.log(url);
            // se asigna al campo del formulario
            this.form.get('image')?.setValue(url)
          })
        })
      )
      // Para que todo se procese
      .subscribe()
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
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
