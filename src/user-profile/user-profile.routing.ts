import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/Services/authGuardService/auth-guard.service';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
    { 
        path: 'user-profile' , 
        component: UserProfileComponent,
        canActivate: [ AuthGuard ]
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class UserProfileRoutingModule {}

export const routingComponents = [ UserProfileComponent ];