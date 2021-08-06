import {Office}  from 'src/app/oficinas/models/offices';
export interface User{
    id:number;
    activo:number;
    api_token:string;
    office_id:number;
    username: string;
    email:string;
    office:Office;
}