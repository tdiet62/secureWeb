import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";

import {Session} from './entityObjects/session';
import {SessionData} from './dataclass';
import { Md5 } from '../../node_modules/ts-md5/dist/md5';
import {serviceInterface} from "./interfaces/service-interface";


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import {Observable} from "rxjs/observable";


class loginData{
  userName:string;
  pass:Int32Array|string;
}


@Injectable()
export class LoginService extends serviceInterface {

  public errorMsg:string;

  constructor(protected http: Http,
              protected _session:Session,
              protected _sessionData:SessionData) {
    super(http,_session,_sessionData);
    this.setNeedsAuthentication(true);
  }

  getNeedsAuthentication(): boolean {
    return this._sessionData.needsAuthentication;
  }

  setNeedsAuthentication(value: boolean): void {
    this._sessionData.needsAuthentication = value;
  }

  getLoginData(userName:string, password:string):Observable<SessionData>{
    let loginUrl:string='../app/rest/restServices.php?queryType=login';
    let hashedPassword:string|Int32Array=Md5.hashStr(password);
    let headers:Headers=this.getHeaders();
    let userdata=new loginData();
    userdata.userName=userName;
    userdata.pass=hashedPassword;
    return this.http.post(loginUrl,JSON.stringify(userdata),headers)
      .map((res:Response) => this.success(res))
      .catch((error:any) => this.fail(error));
  }

   doLogin(userName:string, password:string):void{
        this.getLoginData(userName,password).subscribe(sd => this._sessionData);
        console.log("Session : "+this._session.userId + ":" + this._session.sessionKey);
   }

   success(res:Response):SessionData{
   this.setNeedsAuthentication(false);
     console.log("Success:" + res);
     return this._session=res.json();
   }

   fail(error:any):any{
   this.setNeedsAuthentication(false);
   console.log(error.json());
   this.errorMsg=error.json().error;
   }
}
