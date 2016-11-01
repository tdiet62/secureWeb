"use strict";
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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var dataclass_1 = require('./dataclass');
var user_1 = require('./entityObjects/user');
var InternalDataService = (function () {
    function InternalDataService(http) {
        this.http = http;
        this.sessionData = new dataclass_1.SessionData();
        this.setNeedsAuthentication(true);
    }
    InternalDataService.prototype.getSession = function () {
        return this.session;
    };
    InternalDataService.prototype.setSession = function (value) {
        this.session = value;
    };
    InternalDataService.prototype.getSessionData = function () {
        return this.sessionData;
    };
    InternalDataService.prototype.setSessionData = function (value) {
        this.sessionData = value;
    };
    InternalDataService.prototype.getNeedsAuthentication = function () {
        return this.sessionData.needsAuthentication;
    };
    InternalDataService.prototype.setNeedsAuthentication = function (value) {
        this.sessionData.needsAuthentication = value;
        this.setSessionData(this.sessionData);
    };
    InternalDataService.prototype.getUserById = function (id) {
        var header = this.getHeaders();
        return this.http.get('../app/rest/restServices.php?queryType=get&class=users&id=' + id, header)
            .toPromise()
            .then(this.extractUserData)
            .catch(this.handleError);
    };
    InternalDataService.prototype.extractUserData = function (res) {
        return new user_1.User().deserialize(res);
    };
    InternalDataService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (this.getNeedsAuthentication() == false) {
            var session = this.getSession();
            headers.append("SecureWebSessionKey", '5817c1c8d6a835.56595566');
        }
        return headers;
    };
    InternalDataService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    InternalDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], InternalDataService);
    return InternalDataService;
}());
exports.InternalDataService = InternalDataService;
//# sourceMappingURL=internal-data.service.js.map