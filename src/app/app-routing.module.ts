import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { ContactComponent } from './contact/contact.component'
import { DemoComponent } from './demo/demo.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LayoutComponent } from './layout/layout.component'

import { AdminGuard } from './admin.guard'

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomeModule ) }, // llamada al modulo
    { path: 'products', canActivate: [AdminGuard], loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    { path: 'contact', canActivate: [AdminGuard] , component: ContactComponent },
  ]},
  { path: 'demo', component: DemoComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
