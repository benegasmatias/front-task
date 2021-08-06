import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EdittaskComponent } from '../edit-tasks/edit-tasks.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export interface Task{
  id:string;
  name:string;
  description:string
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
  url = false;
  cant=2;
  pageNext = false;
  pagePrev = false;
  displayedColumns: string[] = ['index', 'name', 'description','acciones'];
  dataSource: MatTableDataSource<Task>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private serviceTask:TaskService,private dialog:MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'))
    this.cargaList();
  }
  cargaList(){
    this.spinnertasks=false;
    this.notasks = false;
    this.dataSource=null
    this.serviceTask.getTasksPaginate(this.cant,1).subscribe(
      data=>{
        this.tasks = data['tasks'].data
        this.dataSource = new MatTableDataSource(this.tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        this.pageNext =  data['tasks'].next_page_url.substr(55,35)
        this.pagePrev = data['tasks'].prev_page_url.substr(55,35)
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


  
  alert(msj) {
    this._snackBar.open(msj, 'Ok', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  delete(task) {
    if (confirm("Esta seguro que quiere eliminar esta Tarea")){
      this.serviceTask.deleteTask(task).subscribe(
        data => {
          // console.log(data);
          if (data['status'] == 1) {
            this.alert('Tarea eliminada!')
            this.cargaList();
          } else {
            this.alert('¡Error, no se pudo realizar la accion!')
          }
        }
      )
    }
  }

  getPaginate(pag){
    console.log(pag)
   if(pag){
    this.dataSource=null
      this.serviceTask.getTasksPaginate(this.cant,pag).subscribe(
        data=>{
          this.tasks = data['tasks'].data
          this.dataSource = new MatTableDataSource(this.tasks);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if( data['tasks'].next_page_url){
            this.pageNext =  data['tasks'].next_page_url.substr(55,35)
          }else{
            this.pageNext = false
          }
          if( data['tasks'].prev_page_url){
           this.pagePrev = data['tasks'].prev_page_url.substr(55,35)
          }else{
            this.pagePrev=false
          }
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
  }

}
