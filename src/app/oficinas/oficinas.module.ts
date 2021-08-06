import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OficinasRoutingModule } from './oficinas-routing.module';
import { OficinasComponent } from './oficinas.component';
import { FormOficinaComponent } from './components/form-oficina/form-oficina.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { CdkTableModule } from '@angular/cdk/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LisOficinasComponent } from './components/lis-oficinas/lis-oficinas.component';
import { EditOficinasComponent } from './components/edit-oficinas/edit-oficinas.component';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [OficinasComponent, FormOficinaComponent, LisOficinasComponent, EditOficinasComponent],
  imports: [
    CommonModule,
    OficinasRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,CdkTableModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,MatCardModule,MatProgressSpinnerModule

  ]
})
export class OficinasModule { }