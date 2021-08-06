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
      name: 'Expedientes',
      route: 'inicio',
      icon: 'assignment',
      subMenu: [
        {
          name: 'Ver Expediente',
          route: 'expedientes/recorridoExpedientes'
        },
        {
          name: 'Expedientes a Revisar',
          route: `expedientes/listExpedientes`,
        },
        {
          name: 'Historial Expedientes',
          route: `expedientes/historialExpedientes`,
        }, {
          name: 'Expediente externos',
          route: 'expedientes/externalExpedientes'
        }, {
          name: 'Expedientes Archivados',
          route: `expedientes/archivedExpedientes`
        },
        {
          name: 'Expedientes Activos',
          route: `expedientes/activeExpedientes`
        }
      ]
    })

    if (user.office.name.toLowerCase() == 'mesa de entrada') {
      this.fillerNav[0].subMenu.unshift({
        name: 'Generar Expediente',
        route: `expedientes/addExpediente`
      });
    } else if (user.office.name.toLowerCase() == 'informatica') {
      this.fillerNav.push({
        name: 'Usuarios',
        route: 'inicio',
        icon: 'assignment',
        subMenu: [
          {
            name: 'Generar Usuario',
            route: `usuarios/addUsuario`,
          },
          {
            name: 'Listar Usuario',
            route: `usuarios/listUsuarios`,
          }
        ]
      },
        {
          name: 'Oficinas',
          route: 'inicio',
          icon: 'assignment',
          subMenu: [
            {
              name: 'Generar Oficina',
              route: `oficinas/addOficina`,
            },
            {
              name: 'Listar Oficinas',
              route: `oficinas/listOficinas`,
            }
          ]
        }
      )

    }
    else if (user.office.name.toLowerCase() == 'privada') {
      this.fillerNav[0].subMenu.push({
        name: 'Expedientes p/oficina',
        route: 'expedientes/count-expedientes-activos'
      });
    }
    this.datoUser = {
      name: user.name,
      imagen: "assets/img/logo.png"
    }
  }
}
