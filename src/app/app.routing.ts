import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProjectManagementComponent } from '../project-management/project-management.component';
import { AuthGuard } from '../shared/auth-guard.service';

const routes: Routes = [
    { 
        path: '', 
        component: DashboardComponent, 
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    { 
        path: 'projects', 
        component: ProjectManagementComponent, 
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class MainRoutingModule {};



