import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelBaseComponent } from './panel-base.component';

const routes: Routes = [{ path: '', component: PanelBaseComponent,children:[
  { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
  { path: 'expedientes', loadChildren: () => import('../expedientes/expedientes.module').then(m => m.ExpedientesModule) },
  {path:'usuarios',loadChildren:()=>import('../usuarios/usuarios.module').then(m=>m.UsuariosModule)},
  {path:'oficinas',loadChildren:()=>import('../oficinas/oficinas.module').then(m=>m.OficinasModule)}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelBaseRoutingModule { }
