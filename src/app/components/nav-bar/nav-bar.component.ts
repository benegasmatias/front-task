import { LoginService } from '../../login/services/login.service'
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() barraBusqueda: boolean;
  @Input() menuUser: boolean;
  @Input() sideNav: boolean;
  @Output() sideNavOpen = new EventEmitter();

  datoUser: { name, imagen };
  title ;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private loginService: LoginService, protected route: Router) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnInit(): void {
    if (this.menuUser) {
      this.cargarUser()
    }
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('')
  }

  private cargarUser() {
    let user = JSON.parse(sessionStorage.getItem('currentUser'))
    this.title= `Expedientes-${user.office.name}`
    this.datoUser = {
      name: user.name,
      imagen: "assets/img/logo.png"
    }
  }


}