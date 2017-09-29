import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets/tickets.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { KeysPipe } from '../shared/Pipes/object-keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    TicketsComponent,
    KeysPipe
  ]
})
export class DashboardModule { }
