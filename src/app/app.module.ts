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
import { LoadersCssModule } from 'angular2-loaders-css';
import { LoaderService } from '../shared/loader.service';

// app modules

// login
import { LoginModuleRoute, LoginModuleComponents } from '../auth/module-login.module';
import { ProjectManagementComponent } from '../project-management/project-management.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,

    // an array of login module components
    LoginModuleComponents,
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
    LoginModuleRoute,
    LoadersCssModule
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {
        provide: Http,
        useFactory: httpFactory,
        deps: [XHRBackend, RequestOptions, LoaderService]
    },
    AuthGuard,
    UserService,
    LoaderService
]
})
export class AppModule { }
