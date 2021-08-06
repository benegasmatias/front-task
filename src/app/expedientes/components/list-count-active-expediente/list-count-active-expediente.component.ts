import { Component, OnInit } from '@angular/core';
import{ExpedienteService} from 'src/app/services/expediente.service'
import { LoginService } from 'src/app/login/services/login.service';
import { FunctionsService } from 'src/app/services/functions.service'

@Component({
  selector: 'app-list-count-active-expediente',
  templateUrl: './list-count-active-expediente.component.html',
  styleUrls: ['./list-count-active-expediente.component.scss']
})
export class ListCountActiveExpedienteComponent implements OnInit {
  //props
  data=[];
  displayedColumns: string[] = ['index','name', 'total_exp'];
  isLoadingResults:boolean=false;
  constructor(private expedienteService:ExpedienteService,private loginService: LoginService, private functionService: FunctionsService) { }

  ngOnInit(): void {
    this.getData();
  }
  private getData(){
    this.isLoadingResults=true
    this.expedienteService.getCountExpedientesActivos().subscribe(
      response=>{
        this.data=response['result'];
      },
      error=>{
        console.log(error);
        this.loginService.logout()
        this.functionService.baseRedirect();
      },
      ()=>{
        this.isLoadingResults=false
      }
    )
  }
}
