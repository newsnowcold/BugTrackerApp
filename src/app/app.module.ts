import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { httpFactory } from './http.factory';
import { AuthGuard } from '../shared/auth-guard.service';
import { MainRoutingModule } from './app.routing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserService } from '../shared/user.service';

// app modules

// login
import { loginModuleRoute, loginModuleComponents } from '../auth/module-login.module';
import { ProjectManagementComponent } from '../project-management/project-management.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,

    // an array of login module components
    loginModuleComponents,
    DashboardComponent,
    ProjectManagementComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MainRoutingModule,
    // the actual login routing module
    loginModuleRoute
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {
        provide: Http,
        useFactory: httpFactory,
        deps: [XHRBackend, RequestOptions]
    },
    AuthGuard,
    UserService
]
})
export class AppModule { }
