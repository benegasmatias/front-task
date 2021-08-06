import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent}from './login/login.component';
import { authGuard } from './login/authGuard';
import { authlogin } from './login/authlogin';

const routes: Routes = [{
  path:'',
  component:LoginComponent,
  canActivate:[authlogin]},
  { path: 'panel', loadChildren: () => import('./panel-base/panel-base.module').then(m => m.PanelBaseModule), canActivate:[authGuard]},
  { path: 'oficinas', loadChildren: () => import('./oficinas/oficinas.module').then(m => m.OficinasModule) }]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
