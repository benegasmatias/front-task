import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }

  addTask(task){
    return this.http.post(`${this.API_URI}/task`,task)
  }

  getTasks(){
    return this.http.get(`${this.API_URI}/task`);
  }
  editTask(task){
    return this.http.put(`${this.API_URI}/task`,task)
  }
  deleteTask(id){
    return this.http.delete(`${this.API_URI}/task/${id}`)
  }

  getTasksPaginate(cant,pag){
    return this.http.get(`${this.API_URI}/task/${cant}?page=${pag}`);
  }

  getTaskPaginateUrl(url){
  
    return this.http.get(`${this.API_URI}/${url}`);
  }

  
  
}
