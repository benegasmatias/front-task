import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private serviceUsuarios: UsuarioService,private dialog:MatDialogRef<UserEditComponent>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(this.data.user.username, Validators.required),
      email: new FormControl(this.data.user.email, [Validators.required]),
      newemail:new FormControl(''),
      activo: new FormControl(this.data.user.activo),
      password: new FormControl('',[Validators.minLength(4)])
    });
  }
  onSubmit() {
    if (this.form.value.password === "") {
      this.form.removeControl('password');
    }
    if (this.form.value.newemail === "") {
      this.form.removeControl('newemail');
    }
    this.serviceUsuarios.edit(this.form.value).subscribe(
      data => {
        this.close(true);
      },
      error => console.log(error)
    )
  }
  close(result=false){
    this.dialog.close({'confirm':result})
  }
}
