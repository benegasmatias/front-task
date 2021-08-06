import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {  MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { OficinaService } from 'src/app/services/oficina.service';

@Component({
  selector: 'app-edit-oficinas',
  templateUrl: './edit-oficinas.component.html',
  styleUrls: ['./edit-oficinas.component.scss']
})
export class EditOficinasComponent implements OnInit {

  constructor(private serviceOffice:OficinaService,@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<EditOficinasComponent>) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    colour: new FormControl('', Validators.required),
    id_office: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.email])
  });

  ngOnInit(): void {

    this.form.get('id_office').setValue(this.data.oficina.id)
    this.form.get('name').setValue(this.data.oficina.name)
    this.form.get('colour').setValue(this.data.oficina.colour)
    this.form.get('email').setValue(this.data.oficina.email)
  }
  enviar(){
    this.dialogref.close({confirm:true,form:this.form.value})
  
  }

  close(){
    this.dialogref.close()
  }
 
}
