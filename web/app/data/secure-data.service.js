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
var internal_data_service_1 = require('./internal-data.service');
var SecureDataService = (function () {
    function SecureDataService(internalDataService) {
        this.internalDataService = internalDataService;
    }
    SecureDataService.prototype.getNeedsAuthentication = function () {
        return this.internalDataService.getNeedsAuthentication();
    };
    SecureDataService.prototype.setNeedsAuthentication = function (value) {
        this.internalDataService.setNeedsAuthentication(value);
    };
    SecureDataService.prototype.getUser = function (id) {
        var user = null;
        this.internalDataService.getUserById(id)
            .then(function (res) {
            user = res;
            console.log("user: " + user.id + " res : " + res);
        })
            .catch(function (err) { console.log("Error: " + err); });
        return user;
    };
    SecureDataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [internal_data_service_1.InternalDataService])
    ], SecureDataService);
    return SecureDataService;
}());
exports.SecureDataService = SecureDataService;
//# sourceMappingURL=secure-data.service.js.map