import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { OficinaService } from 'src/app/services/oficina.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit {
  hide = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  oficinas;
  form = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('',[Validators.required,Validators.minLength(4)]),
    email: new FormControl('',[Validators.required,Validators.minLength(6),Validators.email]),
    office_id: new FormControl('', Validators.required)
  });
  user;
  alertSuccess: boolean;
  spinnerSave: boolean;
  alertErr: boolean;
  
  constructor(private serviceOficina:OficinaService,private serviceUsuarios:UsuarioService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.alertSuccess = false;
    this.spinnerSave = false;
    this.alertErr= false;
    
    this.serviceOficina.getOffice().subscribe(
      data=>{
              this.oficinas = data['offices']

            },
      e=>console.log(e)
    )
    
    
  }

  enviar(){
    this.spinnerSave = true;
    this.serviceUsuarios.addUsuario(this.form.value).subscribe(
      data=>{
        this.spinnerSave = false;
        if(data['status']==1){
          this.form.get('username').setValue('')
          this.form.get('password').setValue('')
          this.form.get('email').setValue('')
          this.form.get('office_id').setValue('')
          this.alert('Usuario creado Correctamente') 
        }else{
          this.alert('No se pudo crear el usuario!') 
        }
      }
    )
    // this.serviceExpediente.initExpediente(this.form.value).subscribe(
    //   data=>{
    //     if(data['status']=='1'){
    //       this.alertSuccess=true;
    //       this.spinnerSave=false;
    //       this.alert('Se Inicio el expediente!')
    //     }else{
    //       this.alert('No se pudo iniciar el expediente!')
    //       this.spinnerSave=false;
    //     }
    //   },
    //   error=>console.log(error)
    // )
  }

  alert(msj) {
    this._snackBar.open(msj, 'OK', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }
}
