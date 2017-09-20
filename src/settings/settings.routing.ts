import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthGuard } from '../shared/auth-guard.service';

const routes: Routes = [
    { 
        path: 'settings' , 
        component: SettingsComponent,
        canActivate: [ AuthGuard ]
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class SettingsRoutingModule {}

export const routingComponents = [ SettingsComponent ];