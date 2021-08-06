import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {  MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.scss']
})
export class EdittaskComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<EdittaskComponent>) { }
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
