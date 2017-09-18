import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationRoutingModule } from './registration.routing';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ],
  declarations: [
    RegistrationFormComponent
  ]
})
export class RegistrationModule { }
