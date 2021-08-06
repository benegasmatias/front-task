import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/login/services/login.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { ViewExpedienteComponent } from '../view-expediente/view-expediente.component';
import { FunctionsService } from 'src/app/services/functions.service';
export interface Office {
  id: string;
  name: string;
}
export interface ExpedienteData {
  id: string;
  cuit: string;
  number: string;
  reason: string;
  initiator: string;
  created_at: string;
}
export interface expedienteOfficeOrigenData {
  id: string;
  record_id: string;
  record: ExpedienteData;
  office_id: string;
  office: Office;
  output: string;
  input: string;
  record_step_office_id: string
}


export interface expedienteOfficeData {
  id: string;
  record_id: string;
  record: ExpedienteData;
  office_id: string;
  office: Office;
  output: string;
  input: string;
  record_step_office: expedienteOfficeOrigenData;
}
@Component({
  selector: 'app-travel-expediente',
  templateUrl: './travel-expediente.component.html',
  styleUrls: ['./travel-expediente.component.scss']
})
export class TravelExpedienteComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  spinnerExpediente = false;

  displayedColumns: string[] = ['index', 'record_step_office', 'observacion', 'input', 'output', 'dias'];
  dataSource: MatTableDataSource<expedienteOfficeData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  travel: [];
  record;

  constructor(
    private serviceExpediente: ExpedienteService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private loginService: LoginService,
    private functionService: FunctionsService
  ) {
    this.travel = [];
  }
  form = new FormGroup({
    number_record: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
  });
  ngOnInit(): void {


  }

  buscar(number) {
    this.record = [];
    this.spinnerExpediente = true
    number = `1500-${number}-2021-EXP`;
    this.serviceExpediente.getTravel(number).subscribe(
      data => {
        if (data['record']) {
          this.record = data['record'];
          this.travel = this.record.travel;
          this.dataSource = new MatTableDataSource(this.travel);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.travel=[];
        }
      },
      err => {
        this.loginService.logout()
        this.functionService.baseRedirect();
      },
      () => {
        this.spinnerExpediente = false
      }

    )


  }
  verExpediente() {

    let expediente = {
      number: this.record.number,
      reason: this.record.reason,
      initiator: this.record.initiator,
      created_at: this.record.created_at
    }
    const dialogref = this.dialog.open(ViewExpedienteComponent, {
      data: { title: 'Expediente', expediente }
    });
  }

  alert(msj) {
    this._snackBar.open(msj, 'Entendido', {
      duration: 2000,
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
