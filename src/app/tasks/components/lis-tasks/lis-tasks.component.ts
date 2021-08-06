import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EdittaskComponent } from '../edit-tasks/edit-tasks.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface Office{
  id:string;
  name:string;
  email:string
}
@Component({
  selector: 'app-lis-tasks',
  templateUrl: './lis-tasks.component.html',
  styleUrls: ['./lis-tasks.component.scss']
})

export class LisTasksComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  tasks;
  spinnertasks;
  notasks;
  user;
  displayedColumns: string[] = ['index', 'name', 'email','acciones'];
  dataSource: MatTableDataSource<Office>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private serviceTask:TaskService,private dialog:MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'))
    this.cargaList();
  }
  cargaList(){
    this.spinnertasks=false;
    this.notasks = false;
    this.serviceTask.getOffice().subscribe(
      data=>{
        this.tasks = data['offices']
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.tasks){
         
          this.spinnertasks=false;
          this.notasks = false;
        }else{
          this.spinnertasks=false;
          this.notasks = true;
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
      const dialogef = this.dialog.open(EdittaskComponent, {
        data: {title: 'Editar Oficina',oficina}
        });
   
        dialogef.afterClosed().subscribe(result => {
          if(result){
            if (result.confirm) {
              console.log(result)
              this.serviceTask.editOffice(result.form).subscribe(
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
      this.serviceTask.deleteOffice(office).subscribe(
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
