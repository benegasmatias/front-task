import { Component, OnInit, HostListener  } from '@angular/core';

import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  isloged = false;
  spinner = false;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });z

  constructor(private loginService: LoginService, protected route: Router) {}

  ngOnInit() {

    document.getElementById('username').focus({ preventScroll: false });
  }

  login() {
    let usuario;
    this.spinner = true;
    this.isloged = false;
    let token;

    this.loginService.login(this.form.value).subscribe(
      (data) => {
        usuario = data['user'];
        token = data['token'].original.token
        this.loginService.setUser(usuario);
        this.loginService.setApiToken(usuario.api_token);
        this.loginService.setToken(token);
          this.route.navigateByUrl('panel');
         
      },
      (err) => {
        console.log(err);
        this.isloged = true;
        this.spinner = false;
      },
      () => {}
    );
  }

}
