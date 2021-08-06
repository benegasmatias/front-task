import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { NavBarModule } from '../components/nav-bar/nav-bar.module'

import { PanelBaseRoutingModule } from './panel-base-routing.module';
import { PanelBaseComponent } from './panel-base.component';



@NgModule({
  declarations: [PanelBaseComponent],
  imports: [
    CommonModule,
    PanelBaseRoutingModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    NavBarModule
  ]
})
export class PanelBaseModule { }
