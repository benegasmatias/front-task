import { Injectable,isDevMode} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  baseRedirect(){
    if(isDevMode()){
      window.location.assign("/")
    }else{
      window.location.assign("https://sedacreditaciones.com/app/expedientes/")
    }
  }
}
