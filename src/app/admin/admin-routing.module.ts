import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component'
import { NavComponent } from './components/nav/nav.component'

const routes: Routes = [
  { path: 'create', component: ProductFormComponent },
  { path: '', component: NavComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
