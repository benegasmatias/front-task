import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { ViewExpedienteComponent } from '../view-expediente/view-expediente.component'
import { DialogConfirmComponent } from '../../../components/dialog-confirm/dialog-confirm.component';
import { SubmitExpedienteComponent } from '../submit-expediente/submit-expediente.component'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login/services/login.service';
import { FunctionsService } from 'src/app/services/functions.service';

import { RecordStepOffice } from '../../models/recordStepOffice'
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

@Component({
  selector: 'app-list-expediente',
  templateUrl: './list-expediente.component.html',
  styleUrls: ['./list-expediente.component.scss']
})

export class ListExpedienteComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  spinnerExpediente = false
  noExpedientes = false
  isLoading = false;
  user;
  expedientes: RecordStepOffice[] = [];
  displayedColumns: string[] = ['record', 'input', 'days_lapsed', 'record_step_office', 'acciones'];
  dataSource: MatTableDataSource<RecordStepOffice>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private serviceExpediente: ExpedienteService, private _snackBar: MatSnackBar, private loginService: LoginService,
    private functionService: FunctionsService) { }


  ngOnInit(): void {
    this.cargaLista();
  }

  cargaLista() {
    // this.spinnerExpediente=true
    this.isLoading = true;
    this.user = JSON.parse(sessionStorage.getItem('currentUser'))
    if (this.user.office.name.toLowerCase() == 'privada') {
      this.displayedColumns = ['record', 'input', 'days_lapsed', 'record_step_office', 'acciones'];
    }
    this.serviceExpediente.getExpedientes(this.user.office.id).subscribe(
      data => {
        this.expedientes = data['records']
        this.dataSource = new MatTableDataSource(this.expedientes);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 100);
        // if (this.expedientes.length>0) {

        //   // this.cantElementos = this.dataSource.filteredData[0]elements.length
        //   this.spinnerExpediente = false
        //   this.noExpedientes = false
        // } else {
        //   this.spinnerExpediente = false
        //   this.noExpedientes = true
        // }
      },
      err => {
        console.log(err)
        this.isLoading = false
        // this.loginService.logout()
        // this.functionService.baseRedirect();
        // window.location.assign("https://sedacreditaciones.com/app/expedientes/")
      },
      () => {
        this.setFilterPredicate();
        this.isLoading = false
      }
    )
  }

  verExpediente(expediente) {
    const dialogref = this.dialog.open(ViewExpedienteComponent, {
      data: { title: 'Expediente', expediente }
    });
  }
  ngOnDestroy() {
    if (this.expedientes) {
      var exp = [];
      for (let i = 0; i < this.expedientes.length; i++) {
        if (this.expedientes[i].new == '1') {
          exp.push({ id: this.expedientes[i].id });
        }
      }
      if (exp.length != 0) {
        this.serviceExpediente.setView({ record: exp }).subscribe(
          data => {

          })
      }
    }
  }

  enviar(expediente) {
    const dialogref = this.dialog.open(SubmitExpedienteComponent, {
      data: { title: 'Enviar Expediente', expediente, submit: 'enviar' }
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading=true;
        if (result.confirm) {
          this.serviceExpediente.submitExpediente(result.form).subscribe(
            data => {
              if (data['status'] == 1) {
                this.alert('Expediente enviado correctamente!')
                this.cargaLista();
              } else {
                this.alert('Expediente no enviado!');
              }
            },
            err => {
              this.isLoading = false;
              console.log(err)
              this.loginService.logout()
              this.functionService.baseRedirect();
            },
            () => {
              this.isLoading = false;
            }
          )
        }else{
          this.isLoading = false;
        }
      }
    });
  }
  archivarExpediente(expediente) {
    const dialogref = this.dialog.open(DialogConfirmComponent, {
      data: { title: 'Archivar Expediente', msj: '¿Esta seguro que quiere archivar el expediente?' }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.isLoading = true;
        this.serviceExpediente.storeExpediente({ id: expediente }).subscribe(
          data => {
            this.cargaLista();
          },
          err => {
            this.isLoading = false;
            console.log(err)
            this.loginService.logout()
            this.functionService.baseRedirect();
            //  window.location.assign("https://sedacreditaciones.com/app/expedientes/")
          },
          () => {
            this.isLoading = false;
          }
        )
      }
    });


  }

  applyFilter(value: string) {
    // let filterValue = (event.target as HTMLInputElement).value;
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
    // console.log(this.dataSource.filter);
    // const filterValue = (event.target as HTMLInputElement).value;
    // console.log(filterValue);
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  alert(msj) {
    this._snackBar.open(msj, 'Ok', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  solicitarFirma(expediente) {
    const dialogref = this.dialog.open(DialogConfirmComponent, {
      data: { title: 'Soicitud de firma', msj: 'Seguro quiere enviar el expediente a que lo firmen?' }
    });


    dialogref.afterClosed().subscribe(result => {
      if (result.confirm) {
        if (this.user.office.name.toLowerCase() != 'privada') {
          expediente['office_destination_id'] = 5;
          this.serviceExpediente.requestFirm(expediente).subscribe(
            data => {
              if (data['status'] == 1) {
                this.alert('Solicitud enviada!');
                this.cargaLista();
              } else {
                this.alert('Solicitud no enviada!')
              }
            }
          )
        }
      }
    });


  }

  firmExpediente(expediente) {

    if (this.user.office.name.toLowerCase() == 'privada') {
      const dialogef = this.dialog.open(SubmitExpedienteComponent, {
        data: { title: 'Firmar Expediente', expediente, submit: 'firm' }
      });

      dialogef.afterClosed().subscribe(result => {
        if (result) {
          if (result.confirm) {
            console.log(result.fom)
            this.serviceExpediente.firmExpediente(result.form).subscribe(
              data => {
                if (data['status'] == 1) {
                  this.alert('Expediente Firmado!')
                  this.cargaLista();
                } else {
                  this.alert('Expediente No firmado')
                }
              },
              e => console.log(e)
            )
          }
        }
      });
    } else {
      console.log('error')
    }
  }
  adjudicarExpediente(id) {
    const dialogref = this.dialog.open(DialogConfirmComponent, {
      data: { title: 'Adjudicar Expediente', msj: '¿Esta seguro que quiere adjudicar el expediente?' }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.isLoading = true;
        let exp = {
          'id': id,
          'awarded': 1
        };
        this.serviceExpediente.updateExpediente(exp).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.error(err);
            this.isLoading = false;
            // this.loginService.logout();
            // this.functionService.baseRedirect();
          },
          () => {
            this.isLoading = false;
          }
        )
      }
    });
  }

  setFilterPredicate() {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
  }
}
