import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationRoutingModule } from './registration.routing';

@NgModule({
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule
  ],
  declarations: [
    RegistrationFormComponent
  ]
})
export class RegistrationModule { }
