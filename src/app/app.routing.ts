import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/Services/authGuardService/auth-guard.service';
import { SettingsComponent } from './../settings/settings.component';

const routes: Routes = [
    // { 
    //     path: '', 
    //     component: DashboardComponent, 
    //     pathMatch: 'full',
    //     canActivate: [ AuthGuard ]
    // }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})

export class MainRoutingModule {};



