import {Task}  from 'src/app/tasks/models/task';
export interface User{
    id:number;
    activo:number;
    api_token:string;
    office_id:number;
    username: string;
    email:string;
    office:Task;
}