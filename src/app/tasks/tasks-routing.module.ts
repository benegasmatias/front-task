import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormOficinaComponent } from './components/form-tasks/form-tasks.component';
import { LisOficinasComponent } from './components/lis-tasks/lis-tasks.component';

import { OficinasComponent } from './tasks.component';

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
