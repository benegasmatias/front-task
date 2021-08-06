import {Office} from 'src/app/oficinas/models/offices'
import {Record} from './record'
export interface RecordStepOffice{
    id:number;
    record_id:number;
    office_id:number;
    record_step_office_id:number;
    input:Date;
    days_lapsed?:number;
    office:Office;
    record:Record;
    record_step_office:RecordStepOffice;
    new?:string;
}