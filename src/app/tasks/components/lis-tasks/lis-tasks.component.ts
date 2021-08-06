import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { OficinaService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditOficinasComponent } from '../edit-tasks/edit-tasks.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface Office{
  id:string;
  name:string;
  email:string
}
@Component({
  selector: 'app-lis-oficinas',
  templateUrl: './lis-oficinas.component.html',
  styleUrls: ['./lis-oficinas.component.scss']
})

export class LisOficinasComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  oficinas;
  spinnerOficinas;
  noOficinas;
  user;
  displayedColumns: string[] = ['index', 'name', 'email','acciones'];
  dataSource: MatTableDataSource<Office>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private oficinaService:OficinaService,private dialog:MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'))
    this.cargaList();
  }
  cargaList(){
    this.spinnerOficinas=false;
    this.noOficinas = false;
    this.oficinaService.getOffice().subscribe(
      data=>{
        this.oficinas = data['offices']
        this.dataSource = new MatTableDataSource(this.oficinas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.oficinas){
         
          this.spinnerOficinas=false;
          this.noOficinas = false;
        }else{
          this.spinnerOficinas=false;
          this.noOficinas = true;
        }
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
  editar(oficina){
    if(this.user.office.name.toLowerCase()=='informatica'){
      const dialogef = this.dialog.open(EditOficinasComponent, {
        data: {title: 'Editar Oficina',oficina}
        });
   
        dialogef.afterClosed().subscribe(result => {
          if(result){
            if (result.confirm) {
              console.log(result)
              this.oficinaService.editOffice(result.form).subscribe(
                data=>{
                  if(data['status']==1){
                   this.alert('Oficina actualizada!')
                   this.cargaList();
                  }else{
                   this.alert('Error, no se actualizo!')
                  }
                }
              )
            }
          }
       
          });
    }else{
      console.log('error')
    }
  }

  
  alert(msj) {
    this._snackBar.open(msj, 'Ok', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  delete(office) {
    if (confirm("Esta seguro que quiere eliminar esta oficina")){
      this.oficinaService.deleteOffice(office).subscribe(
        data => {
          // console.log(data);
          if (data['status'] == 1) {
            this.alert('Oficina eliminada!')
            this.cargaList();
          } else {
            this.alert('¡Error, no se pudo realizar la accion!')
          }
        }
      )
    }
  }

}
