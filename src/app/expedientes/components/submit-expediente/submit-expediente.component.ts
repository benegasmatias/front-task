import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/login/services/login.service';
import { OficinaService } from 'src/app/services/oficina.service';
import {FunctionsService} from 'src/app/services/functions.service';

@Component({
  selector: 'app-submit-expediente',
  templateUrl: './submit-expediente.component.html',
  styleUrls: ['./submit-expediente.component.scss']
})
export class SubmitExpedienteComponent implements OnInit {
  destino;
  user
  form = new FormGroup({
    
  });

  constructor(private serviceOffice: OficinaService,@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<SubmitExpedienteComponent>,private loginService:LoginService,private functionService: FunctionsService
) { }
  expediente;
  oficinas=[];
  ngOnInit(): void {

    this.expediente = this.data.expediente.record
    if(this.data.submit=='enviar'){
      this.user = JSON.parse(sessionStorage.getItem('currentUser'))
      this.form.addControl('office_id' , new FormControl('',Validators.required))
      this.form.addControl('record_id' , new FormControl(''))
      this.form.addControl('observation' , new FormControl(''))
      this.form.addControl('office_record_id' , new FormControl(''))
      this.form.addControl('detino' , new FormControl(''))
      
      this.serviceOffice.getOffice().subscribe(
        data=>{
          this.oficinas = data['offices'];
          for (let i = 0; i < this.oficinas.length; i++) {
            
            if(this.oficinas[i].id==this.data.expediente.office_id){
              this.oficinas.splice(i, 1);
            }
          }
          this.form.get('record_id').setValue(this.expediente.id)
          this.form.get('office_record_id').setValue(this.data.expediente.id)
        },
        err=>{
          console.log(err)
          this.loginService.logout()
          this.functionService.baseRedirect();
          // window.location.assign("https://sedacreditaciones.com/app/expedientes/")
        }
      )
    }else{
      this.form.addControl('firm_record_office_id' , new FormControl('',Validators.required))
      this.form.addControl('firm' , new FormControl('',Validators.required))
      this.form.addControl('firm_record_office_id' , new FormControl('',Validators.required))
      this.form.addControl('recordOffice_id' , new FormControl('',Validators.required))
      
      this.form.get('firm_record_office_id').setValue(this.data.expediente.firm_record_office_id)
      this.form.get('recordOffice_id').setValue(this.data.expediente.id)
      
    }
  }

  seleccionOrigin(e){
    this.destino = e;
    if(e==2){
      this.form.addControl('name' , new FormControl('',Validators.required))
      this.form.get('office_id').setValue(this.user.office.id)
    }else{
      this.form.removeControl('name')
    }

  }

  close(){
    this.dialogref.close({confirm:false})
  }

  save(){
    this.dialogref.close({confirm:true,form:this.form.value,submit:this.data.submit})
  }

}
