import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormTaskComponent } from './components/form-tasks/form-tasks.component';
import { LisTasksComponent } from './components/lis-tasks/lis-tasks.component';

import { TasksComponent } from './tasks.component';

const routes: Routes = [{ path: '', component: TasksComponent,children:[
  {path:'addTask',
  component:FormTaskComponent},
  {path:'listTasks',
  component:LisTasksComponent}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
