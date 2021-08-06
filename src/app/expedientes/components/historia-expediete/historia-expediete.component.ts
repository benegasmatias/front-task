import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  selector: 'app-historia-expediete',
  templateUrl: './historia-expediete.component.html',
  styleUrls: ['./historia-expediete.component.scss']
})
export class HistoriaExpedieteComponent implements OnInit {
  expedientes;
  spinnerExpediente= false
  noExpedientes=false
  displayedColumns: string[] = ['index', 'record','office_origen' ,'observacion','input','output','office_destino'];
  dataSource: MatTableDataSource<expedienteOfficeData>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private serviceExpediente:ExpedienteService,private loginService:LoginService,private functionService: FunctionsService
) { }

  ngOnInit(): void {
    this.cargaLista()
  }

  cargaLista(){
    this.spinnerExpediente=true
    let user = JSON.parse(sessionStorage.getItem('currentUser'))
    this.serviceExpediente.getHistorialExpedientes(user.office.id).subscribe(
      data=>{
      if(data){
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
