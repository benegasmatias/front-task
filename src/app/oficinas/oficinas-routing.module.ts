import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormOficinaComponent } from './components/form-oficina/form-oficina.component';
import { LisOficinasComponent } from './components/lis-oficinas/lis-oficinas.component';

import { OficinasComponent } from './oficinas.component';

const routes: Routes = [{ path: '', component: OficinasComponent,children:[
  {path:'addOficina',
  component:FormOficinaComponent},
  {path:'listOficinas',
  component:LisOficinasComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OficinasRoutingModule { }
