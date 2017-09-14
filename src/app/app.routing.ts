import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth-guard.service';
import { SettingsComponent } from './../settings/settings.component';

const routes: Routes = [
    { 
        path: '', 
        component: DashboardComponent, 
        pathMatch: 'full',
        canActivate: [ AuthGuard ]
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class MainRoutingModule {};



