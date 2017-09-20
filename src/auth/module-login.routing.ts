import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from '../shared/auth-guard.service';

const routes: Routes = [
    {   
        path: 'auth' , 
        component: LoginFormComponent
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class LoginRoutingModule {}

export const routingComponents = [ LoginFormComponent ];