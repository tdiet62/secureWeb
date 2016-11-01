import {Http, Headers} from "@angular/http";
import {Session} from "../entityObjects/session";
import {SessionData} from "../dataclass";
export abstract class serviceInterface{


  constructor(protected http:Http,
              protected _session:Session,
              protected _sessionData:SessionData){};


  private getSession():Session{
    return this._session;
  }

  protected getNeedsAuthentication():boolean{
    return this._sessionData.needsAuthentication;
  }

  protected setNeedsAuthentication(value:boolean){
    this._sessionData.needsAuthentication=value;
  }



  protected getHeaders():Headers{
    let headers=new Headers();
    headers.append('Content-Type', 'application/json');
    if(this.getNeedsAuthentication()==false){
      headers.append("SecureWebSessionKey",this._session.sessionKey.toString());
    }
    return headers;
  }
}
