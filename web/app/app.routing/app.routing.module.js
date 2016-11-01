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
var router_1 = require('@angular/router');
var logo_panel_component_1 = require('../logo-panel/logo-panel.component');
var user_profile_component_1 = require('../use-profile/user-profile-component');
var routes = [
    {
        path: '',
        redirectTo: '/userprofile',
        pathMatch: 'full'
    },
    /*{
      path: 'dashboard',
      component: DashboardComponent
    },*/
    {
        path: 'userprofile',
        component: user_profile_component_1.UserProfileComponent
    },
    {
        path: 'login',
        component: logo_panel_component_1.LogoPanelComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.routedComponents = [user_profile_component_1.UserProfileComponent, logo_panel_component_1.LogoPanelComponent];
//# sourceMappingURL=app.routing.module.js.map