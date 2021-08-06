import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpedientesComponent } from './expedientes.component';
import {FormExpedienteComponent } from './components/form-expediente/form-expediente.component'
import { ListExpedienteComponent } from './components/list-expediente/list-expediente.component';
import {HistoriaExpedieteComponent} from './components/historia-expediete/historia-expediete.component'
import {ArchivedExpedienteComponent} from './components/archived-expediente/archived-expediente.component'
import {authOffice} from './components/authOffice';
import { TravelExpedienteComponent } from './components/travel-expediente/travel-expediente.component';
import { ListExternosExpedienteComponent } from './components/list-externos-expediente/list-externos-expediente.component';
import { ListActiveExpedienteComponent } from './components/list-active-expediente/list-active-expediente.component';
import {ListCountActiveExpedienteComponent} from './components/list-count-active-expediente/list-count-active-expediente.component'
const routes: Routes = [{ path: '', component: ExpedientesComponent,children:[
  {path:'addExpediente',component:FormExpedienteComponent,canActivate:[authOffice]},
  {path:'listExpedientes',component:ListExpedienteComponent},
  {path:'historialExpedientes',component:HistoriaExpedieteComponent},
  {path:'archivedExpedientes',component:ArchivedExpedienteComponent},
  {path:'recorridoExpedientes',component:TravelExpedienteComponent},
  {path:'externalExpedientes',component:ListExternosExpedienteComponent},
  {path:'activeExpedientes',component:ListActiveExpedienteComponent},
  {path:'count-expedientes-activos',component:ListCountActiveExpedienteComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedientesRoutingModule { }
