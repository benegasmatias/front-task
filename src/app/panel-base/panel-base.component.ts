import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { LoginService } from '../login/services/login.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-panel-base',
  templateUrl: './panel-base.component.html',
  styleUrls: ['./panel-base.component.scss']
})
export class PanelBaseComponent implements OnDestroy {

  datoUser: { name, imagen };
  fillerNav = [];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private loginService: LoginService, protected route: Router) {
    this.cargarUser()
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {

  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('')
  }

  private cargarUser() {

    let user = JSON.parse(sessionStorage.getItem('currentUser'))
    this.fillerNav.push({
      name: 'Tareas',
      route: 'inicio',
      icon: 'assignment',
      subMenu: [
        {
          name: 'Tareas',
          route: 'inicio',
          icon: 'assignment',
          subMenu: [
            {
              name: 'Generar Tarea',
              route: `tasks/addTask`,
            },
            {
              name: 'Listar Tareas',
              route: `tasks/listTasks`,
            }
          ]
        }
      ]
    })

   
    this.datoUser = {
      name: user.name,
      imagen: "assets/img/logo.png"
    }
  }
}
