import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RequestChangePasswordComponent } from './request-change-password/request-change-password.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { AuthGuard } from '../shared/auth-guard.service';

const routes: Routes = [
    {   
        path: 'auth' , 
        component: LoginFormComponent
    },
    {   
        path: 'forgot-password' , 
        component: RequestChangePasswordComponent
    },
    {   
        path: 'set-new-password' , 
        component: SetNewPasswordComponent
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class LoginRoutingModule {}

export const routingComponents = [ 
    LoginFormComponent,
    SetNewPasswordComponent,
    RequestChangePasswordComponent
];