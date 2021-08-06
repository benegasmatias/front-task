import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { OficinaService } from 'src/app/services/oficina.service';

@Component({
  selector: 'app-form-oficina',
  templateUrl: './form-oficina.component.html',
  styleUrls: ['./form-oficina.component.scss']
})
export class FormOficinaComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  spinnerSave=false;
  constructor(private serviceOffice:OficinaService,private _snackBar: MatSnackBar) { }
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    colour: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required,Validators.email])
  });
  ngOnInit(): void {
  }

  enviar(){
    this.serviceOffice.addOffice(this.form.value).subscribe(  
      data=>{
        if(data['status']==1){
          this.alert('Oficina creada!')
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
