import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OficinaService {
  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }

  addOffice(oficina){
    return this.http.post(`${this.API_URI}/offices`,oficina)
  }

  getOffice(){
    return this.http.get(`${this.API_URI}/offices`);
  }
  editOffice(oficina){
    return this.http.put(`${this.API_URI}/offices`,oficina)
  }
  deleteOffice(oficina){
    return this.http.delete(`${this.API_URI}/offices?id_office=${oficina.id}`)
  }


  
}
