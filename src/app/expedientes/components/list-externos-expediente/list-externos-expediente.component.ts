import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/login/services/login.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import {FunctionsService} from 'src/app/services/functions.service'
export interface Office{
  id:string;
  name:string;
}
export interface ExpedienteData {
  id: string;
  cuit:string;
  number:string;
  reason:string;
  initiator:string;
  created_at:string;
}
export interface expedienteOfficeOrigenData {
  id: string;
  record_id: string;
  record:ExpedienteData;
  office_id: string;
  office:Office;
  output: string;
  input:string;
  record_step_office_id:string
}


export interface expedienteOfficeData {
  id: string;
  record_id: string;
  record:ExpedienteData;
  office_id: string;
  office:Office;
  output: string;
  input:string;
  inicio:string;
  office_destination:Office
  record_step_office:expedienteOfficeOrigenData;
}

@Component({
  selector: 'app-list-externos-expediente',
  templateUrl: './list-externos-expediente.component.html',
  styleUrls: ['./list-externos-expediente.component.scss']
})
export class ListExternosExpedienteComponent implements OnInit {

  constructor(private serviceExpedientes:ExpedienteService,private _snackBar: MatSnackBar,private loginService:LoginService,private functionService: FunctionsService) { }
  expedientes
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  spinnerExpediente= false
  noExpedientes=false
  displayedColumns: string[] = ['index', 'record','office_origen' ,'observacion','input','output','acciones'];
  dataSource: MatTableDataSource<expedienteOfficeData>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  ngOnInit(): void {
   this.cargaList()

  }
  cargaList(){
    let user = JSON.parse(sessionStorage.getItem('currentUser'))
    this.serviceExpedientes.getExternalExpediente(user.office.id).subscribe(
      data=>{
        this.expedientes = data['records']
        this.dataSource = new MatTableDataSource(this.expedientes);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 100);
       if(this.expedientes.length!=0){
         this.spinnerExpediente=false
         this.noExpedientes=false
       }else{
        this.spinnerExpediente=false
         this.noExpedientes=true
       }
      },
      err=>{
        console.log(err)
        this.loginService.logout()
        this.functionService.baseRedirect();
        // window.location.assign("https://sedacreditaciones.com/app/expedientes/")
      }
    )
  }
  regresar(expediente){
    expediente['destino'] =1;
    expediente['submit'] =expediente.submit_external.id;
    expediente['office_record_id']=expediente.id
    expediente['observation']='EXPEDIENTE DEVUELTO'
    this.serviceExpedientes.submitExpediente(expediente).subscribe(
      data=>{
        if(data['status']==1){
          this.cargaList()
          this.alert('El Expediente volvio!. Porfavor verifique en los "Expedientes a revisar"')
        }else{
          this.alert('Error')
        }
      }
    )
   
  }
  alert(msj) {
    this._snackBar.open(msj, 'Ok', {
      duration: 7000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
