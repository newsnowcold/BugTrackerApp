import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { ProjectTableComponent } from './project-table/project-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { SettingsRoutingModule } from './settings.routing';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent,
    ProjectTableComponent,
    UsersTableComponent
  ],
  bootstrap: [ SettingsComponent ]
})
export class SettingsModule { }
