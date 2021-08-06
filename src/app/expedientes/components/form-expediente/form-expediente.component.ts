
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login/services/login.service';
import { ExpedienteService } from '../../../services/expediente.service';
import { OficinaService } from '../../../services/oficina.service';
import { FunctionsService } from 'src/app/services/functions.service'

import{Office} from 'src/app/oficinas/models/offices'
import {User} from 'src/app/usuarios/models/users'

@Component({
  selector: 'app-form-expediente',
  templateUrl: './form-expediente.component.html',
  styleUrls: ['./form-expediente.component.scss']
})


export class FormExpedienteComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  form:FormGroup;
  oficinas:Office[]=[];
  user:User;
  alertSuccess: boolean;
  spinnerSave: boolean;
  alertErr: boolean;
  constructor(
    //parametros del constructor
    private serviceExpediente: ExpedienteService, 
    private serviceOficina: OficinaService, 
    private _snackBar: MatSnackBar, private loginService: LoginService, 
    private functionService: FunctionsService){
      //codigo del constructor
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      this.form=this.setFormGroup();
    }

  ngOnInit(): void {
    this.alertSuccess = false;
    this.spinnerSave = false;
    this.alertErr = false;
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    // this.form.get('origen_office_id').setValue(this.user.office.id)
    this.serviceOficina.getOffice().subscribe(
      data => {
        this.oficinas = data['offices']
        for (let i = 0; i < this.oficinas.length; i++) {
          if (this.oficinas[i].name == this.user.office.name) {
            this.oficinas.splice(i, 1);
          }
        }
      },
      err => {
        console.log(err)
        this.loginService.logout()
        this.functionService.baseRedirect();
      }
    )


  }
  private setFormGroup(){
    return new FormGroup({
      number_record: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+'),Validators.minLength(6),Validators.maxLength(6)]),
      iniciador: new FormControl('', Validators.required),
      cuit: new FormControl('', Validators.pattern('^[0-9]{2}-[0-9]{8}-[0-9]$')),
      motivo: new FormControl('', Validators.required),
      destination_office_id: new FormControl('', Validators.required),
      origen_office_id: new FormControl(this.user.office_id),
      amount: new FormControl(''),
      observation_record: new FormControl('')
    });
  }
  enviar() {
    this.spinnerSave = true;
    this.form.get('number_record').setValue(`1500-${this.form.get('number_record').value}-2021-EXP`);
    this.serviceExpediente.initExpediente(this.form.value).subscribe(
      data => {
        if (data['status'] == '1') {
          this.alertSuccess = true;
          this.spinnerSave = false;
          this.alert('Se Inicio el expediente!')

        } else {
          this.alert('No se pudo iniciar el expediente!')
          this.spinnerSave = false;
        }
      
      },
      err => {
        console.log(err);
        this.alert('No se pudo iniciar el expediente!')
        //inicializo el formgroup otra vez
        this.form=this.setFormGroup();
        // this.loginService.logout()
        // this.functionService.baseRedirect();
      },
      ()=>{
        this.form=this.setFormGroup();
      }
    )
  }

  alert(msj) {
    this._snackBar.open(msj, 'End now', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
