import { Injectable } from '@angular/core';

import { User } from './entityObjects/user'

import { InternalDataService } from './internal-data.service';


@Injectable()
export class SecureDataService {

  constructor(private internalDataService:InternalDataService){
  }

  getNeedsAuthentication():boolean{
   return this.internalDataService.getNeedsAuthentication();
  }

  setNeedsAuthentication(value:boolean):void{
    this.internalDataService.setNeedsAuthentication(value);
  }

  getUser(id:number):User{
    let user:User=null;
    this.internalDataService.getUserById(id)
      .then(res => {
        user=res;
      console.log("user: "+user.id+" res : "+res);})
      .catch(err => {console.log("Error: "+err)});
    return user;
  }

}
