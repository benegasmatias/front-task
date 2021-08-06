import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'; //para lo efecto de botones y link

import {MatFormFieldModule} from '@angular/material/form-field';// para los inpuy y select
import {MatInputModule} from '@angular/material/input'; //para input
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,MatInputModule,MatIconModule
  ]
})
export class LoginModule { }
