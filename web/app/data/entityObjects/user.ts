import { Serializable } from '../interfaces/serializable';
import {Response} from "@angular/http";


export class User implements Serializable<User>{
  id:number;
  userName:string;
  person:number;

  deserialize(input:Response){
    return JSON.parse(input._body)[0];
  }
}
