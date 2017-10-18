import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { AuthGuard } from '../shared/Services/authGuardService/auth-guard.service';
import { DashboardComponent } from './dashboard.component';

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

export class DashboardRoutingModule {};



