import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {SessionData} from './dataclass'
import { User } from './entityObjects/user';
import { Session } from './entityObjects/session';


@Injectable()
export class InternalDataService {
  private session:Session;
  private sessionData:SessionData;

  constructor(private http:Http){
    this.sessionData=new SessionData();
    this.setNeedsAuthentication(true);
  }

  getSession():Session{
    return this.session;
  }

  setSession(value:Session):void{
    this.session=value;
  }

  getSessionData():SessionData{
    return this.sessionData;
  }

  setSessionData(value:SessionData):void{
    this.sessionData=value;
  }

  getNeedsAuthentication():boolean{
    return this.sessionData.needsAuthentication;
  }

  setNeedsAuthentication(value:boolean):void{
    this.sessionData.needsAuthentication=value;
    this.setSessionData(this.sessionData);
  }

  getUserById(id:number):Promise<User>{
      let header:Headers=this.getHeaders();
      return this.http.get('../app/rest/restServices.php?queryType=get&class=users&id='+id,header)
        .toPromise()
        .then(this.extractUserData)
        .catch(this.handleError);
  }

  private extractUserData(res:Response):User{
    return new User().deserialize(res);
  }

  private getHeaders():Headers{
    let headers=new Headers();
    headers.append('Content-Type', 'application/json');
    if(this.getNeedsAuthentication()==false){
      let session=this.getSession();
      headers.append("SecureWebSessionKey",'5817c1c8d6a835.56595566');
    }
    return headers;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
