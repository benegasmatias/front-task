import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<DialogConfirmComponent>) { }
  msj;
  ngOnInit(): void {
    this.msj = this.data.msj;
  }
  close(){
    this.dialogref.close({confirm:false})
  }

  save(){
    this.dialogref.close({confirm:true})
  }


}
