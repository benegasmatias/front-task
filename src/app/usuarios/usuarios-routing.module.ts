import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { authUsuarios } from './authUsuarios';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';

import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';

import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [{ path: '', component: UsuariosComponent,
children:[
  {
    path:'addUsuario',
    component: FormUsuarioComponent,canActivate:[authUsuarios]
  },
  {
    path:'listUsuarios',
    component: ListUsuariosComponent,canActivate:[authUsuarios]
  }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
