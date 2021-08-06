import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-expediente',
  templateUrl: './view-expediente.component.html',
  styleUrls: ['./view-expediente.component.scss']
})
export class ViewExpedienteComponent implements OnInit {
  titulo;
  expediente;
  recordOffice;
  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<ViewExpedienteComponent>) { }
  firma;
  fechaFirma;

  ngOnInit(): void {
  
    this.titulo = this.data.title;
    this.firma=200; 
    if( this.data.expediente)
      this.expediente = this.data.expediente;
    if(this.data.recordOffice){
      this.recordOffice = this.data.recordOffice;
      if(this.recordOffice.firm_record_office_id!=null){
        
        if(this.recordOffice.firm_record_office.firm){
          this.firma=this.recordOffice.firm_record_office.firm;
          this.fechaFirma=this.recordOffice.firm_record_office.firm_date;
        }
      }
    }

      
   
  }

  close(){
    this.dialogref.close()
  }

  save(){
    this.dialogref.close({confirm:true})
  }

 
}
