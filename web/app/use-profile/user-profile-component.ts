import {Component, OnInit, Input} from '@angular/core';

import { SecureDataService } from '../data/secure-data.service';


@Component({
  selector: 'user-profile',
  template: `<p>profile</p>`
})

export class UserProfileComponent implements OnInit{
  constructor(private secureDataService:SecureDataService){}



  ngOnInit():void{
  }

}
