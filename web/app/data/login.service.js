"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var session_1 = require('./entityObjects/session');
var dataclass_1 = require('./dataclass');
var md5_1 = require('../../node_modules/ts-md5/dist/md5');
var service_interface_1 = require("./interfaces/service-interface");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var loginData = (function () {
    function loginData() {
    }
    return loginData;
}());
var LoginService = (function (_super) {
    __extends(LoginService, _super);
    function LoginService(http, _session, _sessionData) {
        _super.call(this, http, _session, _sessionData);
        this.http = http;
        this._session = _session;
        this._sessionData = _sessionData;
        this.setNeedsAuthentication(true);
    }
    LoginService.prototype.getNeedsAuthentication = function () {
        return this._sessionData.needsAuthentication;
    };
    LoginService.prototype.setNeedsAuthentication = function (value) {
        this._sessionData.needsAuthentication = value;
    };
    LoginService.prototype.getLoginData = function (userName, password) {
        var _this = this;
        var loginUrl = '../app/rest/restServices.php?queryType=login';
        var hashedPassword = md5_1.Md5.hashStr(password);
        var headers = this.getHeaders();
        var userdata = new loginData();
        userdata.userName = userName;
        userdata.pass = hashedPassword;
        return this.http.post(loginUrl, JSON.stringify(userdata), headers)
            .map(function (res) { return _this.success(res); })
            .catch(function (error) { return _this.fail(error); });
    };
    LoginService.prototype.doLogin = function (userName, password) {
        var _this = this;
        this.getLoginData(userName, password).subscribe(function (sd) { return _this._sessionData; });
        console.log("Session : " + this._session.userId + ":" + this._session.sessionKey);
    };
    LoginService.prototype.success = function (res) {
        this.setNeedsAuthentication(false);
        console.log("Success:" + res);
        return this._session = res.json();
    };
    LoginService.prototype.fail = function (error) {
        this.setNeedsAuthentication(false);
        console.log(error.json());
        this.errorMsg = error.json().error;
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, session_1.Session, dataclass_1.SessionData])
    ], LoginService);
    return LoginService;
}(service_interface_1.serviceInterface));
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map