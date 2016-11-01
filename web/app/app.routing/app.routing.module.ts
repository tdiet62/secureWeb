import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogoPanelComponent } from '../logo-panel/logo-panel.component';
import { UserProfileComponent } from '../use-profile/user-profile-component';

const routes: Routes = [
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
    component: UserProfileComponent
  },
  {
    path: 'login',
    component: LogoPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [UserProfileComponent, LogoPanelComponent];
