import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { FormTaskComponent } from './components/form-tasks/form-tasks.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { CdkTableModule } from '@angular/cdk/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LisTasksComponent } from './components/lis-tasks/lis-tasks.component';
import { EdittaskComponent } from './components/edit-tasks/edit-tasks.component';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [TasksComponent, FormTaskComponent, LisTasksComponent, EdittaskComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,CdkTableModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,MatCardModule,MatProgressSpinnerModule

  ]
})
export class TasksModule { }
