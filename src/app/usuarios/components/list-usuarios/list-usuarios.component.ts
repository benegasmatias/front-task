import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
// import { expedienteOfficeData } from 'src/app/expedientes/components/list-expediente/list-expediente.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import {UserEditComponent} from 'src/app/usuarios/components/user-edit/user-edit.component';

// import {RecordStepOffice} from 'src/app/expedientes/models/recordStepOffice'
import {User} from '../../models/users'

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.scss']
})
export class ListUsuariosComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['index', 'username', 'email','office','estado','acciones'];
  dataSource: MatTableDataSource<User>
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private dialog:MatDialog,private serviceUsuarios:UsuarioService,private _snackBar: MatSnackBar) { }
  usuarios:User[]=[];
  spinnerUsuarios=false;
  noUsuarios= false;
  ngOnInit(): void {
    this.cargaLista();
  }
  cargaLista(){
    this.spinnerUsuarios=true;
    this.serviceUsuarios.getUsuarios().subscribe(
      data=>{
        this.usuarios = data[0]
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.usuarios.length!=0){
         this.spinnerUsuarios=false;
         this.noUsuarios=false;
         }else{
          this.noUsuarios=true;
          this.spinnerUsuarios=false;
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
  cambiaEstado(usuario){
    let  msj =`Esta seguro que quiere Reactivar al usuario: ${usuario.username}?` ,estado = 1;

      if(usuario.activo==1){
       estado = 0;
        msj =`Esta seguro que quiere Inhabilitar al usuario: ${usuario.username}?`
      }
      
    const dialogref = this.dialog.open(DialogConfirmComponent, {
      data: {title: 'Cambio de estado',msj}
      });
     
      let user = JSON.parse(sessionStorage.getItem('currentUser'))
      
      dialogref.afterClosed().subscribe(result => {
          if (result.confirm) {
              if(usuario.id==user.id){
                this.alert('No puedes deshabilitar tu usuario!')
              }else{
                usuario.activo=estado;
                this.serviceUsuarios.edit(usuario).subscribe(
                  data=>{
                    this.alert('Usuario actualizado con exito!')
                    this.cargaLista();
                  },
                  error=>console.log(error)
                )
              } 
            }
        });
    }


  alert(msj) {
    this._snackBar.open(msj, 'OK', {
      duration: 2500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  userEdit(user){
    const dialogef = this.dialog.open(UserEditComponent, {
      data: {title: 'Editar usuario',user}
      });
      dialogef.afterClosed().subscribe(
        result=>{
          console.log(result)
          if(result.confirm){
            alert('Usuario actualizado con exito!')
            this.cargaLista()
          }
        }
      )
  }
}
