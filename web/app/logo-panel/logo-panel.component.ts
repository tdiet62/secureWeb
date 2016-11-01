import {Component, OnInit, Input} from '@angular/core';

import {NgForm} from "@angular/forms";
import {LoginService} from "../data/login.service";
import {Session} from '../data/entityObjects/session';
import {SessionData} from '../data/dataclass';

@Component({
  moduleId: module.id,
  selector: 'logo-panel',
  templateUrl: './logo-panel.component.html',
  styleUrls: ['./logo-panel.component.css']
})
export class LogoPanelComponent implements OnInit {
  needsAuthentication: boolean;
  @Input()
  private _userName:string;
  @Input()
  private _password:string;

  constructor(
              private loginService: LoginService){
              };

  getNeedsAuthentication():void{
    this.needsAuthentication=this.loginService.getNeedsAuthentication();
  }

  ngOnInit(): void {
    this.getNeedsAuthentication();
  }


  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  onSubmit() {
    console.log(this._userName);  // { first: '', last: '' }
    console.log(this._password);  // false
    let res:any=this.loginService.doLogin(this._userName,this._password);
    console.log(res);
  }
}
