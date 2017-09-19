import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { ProjectTableComponent } from './project-table/project-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { SettingsRoutingModule } from './settings.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule
  ],
  declarations: [
    SettingsComponent,
    ProjectTableComponent,
    UsersTableComponent
  ],
  bootstrap: [ SettingsComponent ]
})
export class SettingsModule { }
