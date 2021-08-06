import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { CdkTableModule } from '@angular/cdk/table';

import {MatTableModule} from '@angular/material/table';
import { UserEditComponent } from './components/user-edit/user-edit.component';
@NgModule({
  declarations: [UsuariosComponent, FormUsuarioComponent, ListUsuariosComponent, UserEditComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    CdkTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class UsuariosModule { }
