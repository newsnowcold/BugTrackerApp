import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { HandyDandyTools } from '../shared/Services/handyToolsService/handyDandy.service';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { httpFactory } from './http.factory';
import { AuthGuard } from '../shared/Services/authGuardService/auth-guard.service';
import { UserService } from '../shared/Services/appUserService/appUser.service';
import { LoadersCssModule } from 'angular2-loaders-css';
import { LoaderService } from '../shared/Services/loaderService/loader.service';
import { IssueStatusAndPriority } from '../shared/Services/statusAndPriorityService/statusAndPriority.service';
import { ProjectService } from '../shared/Services/projectService/project.service';
import { UsersService } from '../shared/Services/usersService/users.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// app modules

// login
import { LoginModuleRoute, LoginModuleComponents } from '../auth/module-login.module';
import { RegistrationModule } from '../registration/registration.module';
import { UserProfileModule } from '../user-profile/user-profile.module';

import { SettingsModule } from '../settings/settings.module';
import { HeaderComponent } from '../shared/Components/header/header.component';

// dashboard module
import { DashboardModule } from '../dashboard/dashboard.module';


// Pipes
import { KeysPipe } from '../shared/pipes/object-keys.pipe';


@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    // an array of login module components
    LoginModuleComponents,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // the actual login routing module
    LoginModuleRoute,
    LoadersCssModule,
    SettingsModule,
    DashboardModule,
    RegistrationModule,
    UserProfileModule
  ],
  bootstrap: [ AppComponent ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthGuard,
    UserService,
    LoaderService,
    IssueStatusAndPriority,
    ProjectService,
    HandyDandyTools,
    UsersService,
    {
        provide: Http,
        useFactory: httpFactory,
        deps: [XHRBackend, RequestOptions, LoaderService, Router, UserService]
    }
  ]
})
export class AppModule { }
