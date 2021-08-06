import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ExpedienteService } from '../../../services/expediente.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/login/services/login.service';
import {FunctionsService} from 'src/app/services/functions.service'
import {OficinaService} from '../../../services/oficina.service';
import {User} from 'src/app/usuarios/models/users'
import { filter } from 'rxjs/operators';
export interface expedienteOfficeData {
  id: string;
  date_input: string;
  officina_name:string;
  observation: string;
  record_num:string;
}

@Component({
  selector: 'app-list-active-expediente',
  templateUrl: './list-active-expediente.component.html',
  styleUrls: ['./list-active-expediente.component.scss']
})

export class ListActiveExpedienteComponent implements OnInit,AfterViewInit  {
  expedientes:expedienteOfficeData[] = []
  spinnerExpediente= false
  noExpedientes=false
  isLoadingResults = false;
  oficinas:any=[];
  user:User;
  displayedColumns: string[] = ['record_num','officina_name' ,'observation','date_input','days_lapsed'];
  dataSource: MatTableDataSource<expedienteOfficeData>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private serviceExpedientes: ExpedienteService,
    private loginService: LoginService,
    private functionService: FunctionsService,
    private serviceOficina:OficinaService
  ) { }

  ngOnInit(): void {
    this.spinnerExpediente=true
    this.user=JSON.parse(sessionStorage.getItem('currentUser'));
  
  }

 
  ngAfterViewInit() {
    this.getExpedientes();
    this.getOffices();
  }
  private getExpedientes(){
    this.isLoadingResults = true;
    this.serviceExpedientes.getExpedientesActivos().subscribe(
      data=>{
        this.expedientes = data['records']
        this.dataSource = new MatTableDataSource(this.expedientes);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 100);
      },
      err=>{
        console.error(err)
        this.loginService.logout()
        this.functionService.baseRedirect();
      },
      ()=>{
        this.setFilterPredicate()
        this.isLoadingResults=false
      }
    )//end subscribe 
  }
  private getExpedientesByOffice(id_office){
    this.isLoadingResults=true;
    this.serviceExpedientes.getExpedientes(id_office).subscribe(
      data => {
        this.expedientes = data['records']
        this.dataSource = new MatTableDataSource(this.expedientes);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 100);
        if (this.expedientes.length>0) {
          this.spinnerExpediente = false
          this.noExpedientes = false
        } else {
          this.spinnerExpediente = false
          this.noExpedientes = true
        }
      },
      err => {
        this.loginService.logout()
        this.functionService.baseRedirect();
      },
      ()=>{
        this.isLoadingResults=false;
      }
    )
  }
  public applyFilter(event: Event, isSelect = false) {
    
    if (isSelect) {
      this.spinnerExpediente = false
      this.noExpedientes = true
      let selectElement = (event.target as HTMLSelectElement)
      let id_office = selectElement.value
      if (id_office.length > 0) {
        this.getExpedientesByOffice(id_office)
      } else {
        this.getExpedientes();
      }
    } else {
      let filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getOffices() {
    this.serviceOficina.getOffice().subscribe(
      data => {
        this.oficinas = data['offices']
      },
      err => {
        console.log(err)
        this.loginService.logout()
        this.functionService.baseRedirect();
      }
    )
  }
  setFilterPredicate() {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
  }

}
