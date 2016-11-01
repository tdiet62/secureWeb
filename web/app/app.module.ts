import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}   from './app.component';
import {SecureDataService} from "./data/secure-data.service";
import {InternalDataService} from "./data/internal-data.service";
import { LoginService } from './data/login.service';
import {AppRoutingModule, routedComponents} from './app.routing/app.routing.module';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {Session} from "./data/entityObjects/session";
import {User} from "./data/entityObjects/user";
import {SessionData} from "./data/dataclass";

@NgModule({
  imports: [BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule],
  declarations: [AppComponent, routedComponents],
  bootstrap: [AppComponent],
  providers: [SecureDataService, InternalDataService, LoginService, Session, User, SessionData]
})
export class AppModule {
}
