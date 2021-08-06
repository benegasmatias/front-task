import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }

  addUsuario(usuario){
    return this.http.post(`${this.API_URI}/users`,usuario)
  }

  getUsuarios(){
    return this.http.get(`${this.API_URI}/users`);
  }
  delete(usuario){
    return this.http.delete(`${this.API_URI}/users`,usuario);
  }
  edit(usuario){
    return this.http.put(`${this.API_URI}/users`,usuario);
  }
  

}
