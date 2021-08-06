import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../../login/services/login.service'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: "root" })
export class authOffice implements CanActivate {

  constructor(private customerService: LoginService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const redirectUrl = route['_routerState']['url'];
    let user = JSON.parse(sessionStorage.getItem('currentUser'))
    if (this.customerService.isLogged() === true && user.office.name.toLowerCase() == 'mesa de entrada') {

      return true;
    } else {

      this.router.navigateByUrl(
        this.router.createUrlTree(
          ['login'], {
          queryParams: {
            redirectUrl
          }
        }
        )
      );

      return false;
    }
  }

}