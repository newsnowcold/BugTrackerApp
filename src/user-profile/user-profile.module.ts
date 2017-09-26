import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile.routing';
import { UserProfileComponent } from './user-profile.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule
  ],
  declarations: [
    UserProfileComponent
  ]
})
export class UserProfileModule { }
