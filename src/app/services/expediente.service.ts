import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }

  initExpediente(expediente){
    return this.http.post(`${this.API_URI}/record/init`,expediente)
  }

  getExpedientes(office_id){
    return this.http.get(`${this.API_URI}/record/${office_id}`);
  }
  getHistorialExpedientes(office_id){
    return this.http.get(`${this.API_URI}/record/record/${office_id}`);
  }
  getArchivedExpedientes(office_id){
    return this.http.get(`${this.API_URI}/record/archived/${office_id}`);
  }

  setView(expedientes){
    return this.http.post(`${this.API_URI}/record/view`,expedientes);
  }

  submitExpediente(expediente){
    return this.http.post(`${this.API_URI}/record/submit`,expediente);
  }
  storeExpediente(expediente){
    return this.http.post(`${this.API_URI}/record/store`,expediente);
  }
  activateExpediente(expediente){
    return this.http.post(`${this.API_URI}/record/activate`,expediente);
  }

  getTravel(id){
    return this.http.get(`${this.API_URI}/record/travel/${id}`);
  }
  getExternalExpediente(id_oficina){
    return this.http.get(`${this.API_URI}/record/external/${id_oficina}`);
  }

  requestFirm(expediente){
    return this.http.post(`${this.API_URI}/record/requestFirm`,expediente);
  }
  firmExpediente(expediente){
    return this.http.post(`${this.API_URI}/record/firm`,expediente);
  }
  regresarExpediente(expediente){
    return this.http.post(`${this.API_URI}/record/external`,expediente);
  }

  getExpedientesActivos(){
    return this.http.post(`${this.API_URI}/record/active`,''); 
  }
  getCountExpedientesActivos(){
    return this.http.get(`${this.API_URI}/record/countactive/offices`);
  }
  //Esta funcion es reutilizable para actualizar un expediente, de a uno o mas campos.
  updateExpediente(expediente){
    let id=expediente.id;
    delete expediente.id;
    return this.http.put(`${this.API_URI}/record/${id}`,expediente);
  }

}
