import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-form-tasks',
  templateUrl: './form-tasks.component.html',
  styleUrls: ['./form-tasks.component.scss']
})
export class FormTaskComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  spinnerSave=false;
  constructor(private serviceTask:TaskService,private _snackBar: MatSnackBar) { }
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    colour: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required,Validators.email])
  });
  ngOnInit(): void {
  }

  enviar(){
    this.serviceTask.addOffice(this.form.value).subscribe(  
      data=>{
        if(data['status']==1){
          this.alert('Task creada!')
          this.form.get('name').setValue('')
          this.form.get('colour').setValue('')
          this.form.get('email').setValue('')
        }
      }
    )
  }

  alert(msj) {
    this._snackBar.open(msj, 'Ok', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
