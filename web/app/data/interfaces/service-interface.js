"use strict";
var http_1 = require("@angular/http");
var serviceInterface = (function () {
    function serviceInterface(http, _session, _sessionData) {
        this.http = http;
        this._session = _session;
        this._sessionData = _sessionData;
    }
    ;
    serviceInterface.prototype.getSession = function () {
        return this._session;
    };
    serviceInterface.prototype.getNeedsAuthentication = function () {
        return this._sessionData.needsAuthentication;
    };
    serviceInterface.prototype.setNeedsAuthentication = function (value) {
        this._sessionData.needsAuthentication = value;
    };
    serviceInterface.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (this.getNeedsAuthentication() == false) {
            headers.append("SecureWebSessionKey", this._session.sessionKey.toString());
        }
        return headers;
    };
    return serviceInterface;
}());
exports.serviceInterface = serviceInterface;
//# sourceMappingURL=service-interface.js.map