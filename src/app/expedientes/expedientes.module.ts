import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpedientesRoutingModule } from './expedientes-routing.module';
import { ExpedientesComponent } from './expedientes.component';
import { FormExpedienteComponent } from './components/form-expediente/form-expediente.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatCardModule} from '@angular/material/card';
import { CdkTableModule } from '@angular/cdk/table';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { ListExpedienteComponent } from './components/list-expediente/list-expediente.component';
import { ViewExpedienteComponent } from './components/view-expediente/view-expediente.component';
import { SubmitExpedienteComponent } from './components/submit-expediente/submit-expediente.component';
import { HistoriaExpedieteComponent } from './components/historia-expediete/historia-expediete.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ArchivedExpedienteComponent } from './components/archived-expediente/archived-expediente.component';
import { TravelExpedienteComponent } from './components/travel-expediente/travel-expediente.component';
import {MatListModule} from '@angular/material/list';
import { ListExternosExpedienteComponent } from './components/list-externos-expediente/list-externos-expediente.component';
import { ListActiveExpedienteComponent } from './components/list-active-expediente/list-active-expediente.component';
import { ListCountActiveExpedienteComponent } from './components/list-count-active-expediente/list-count-active-expediente.component';
@NgModule({
  declarations: [ExpedientesComponent, FormExpedienteComponent, ListExpedienteComponent, ViewExpedienteComponent, SubmitExpedienteComponent, HistoriaExpedieteComponent, ArchivedExpedienteComponent, TravelExpedienteComponent, ListExternosExpedienteComponent, ListActiveExpedienteComponent, ListCountActiveExpedienteComponent],
  imports: [
    CommonModule,
    ExpedientesRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatGridListModule,
    CdkTableModule,MatSortModule,MatTableModule,MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatListModule

  ]
})
export class ExpedientesModule { }
