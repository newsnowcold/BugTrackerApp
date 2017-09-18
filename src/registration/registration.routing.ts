import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form.component';

const routes: Routes = [
    { path: 'complete-registration' , component: RegistrationFormComponent }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class RegistrationRoutingModule {}

export const routingComponents = [ RegistrationFormComponent ];