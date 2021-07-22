import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { LayoutComponent } from './layout/layout.component'

import { AdminGuard } from './admin.guard'

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomeModule ) }, // llamada al modulo
    { path: 'products', canActivate: [AdminGuard], loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    { path: 'contact', canActivate: [AdminGuard] , loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
    { path: 'demo', canActivate: [AdminGuard] , loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule) },
  ]},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
