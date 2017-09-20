/*
    Credits:
    https://scotch.io/@kashyapmukkamala/using-http-interceptor-with-angular2
*/

import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {InterceptedHttp} from "./http.interceptor";
import { LoaderService } from '../shared/loader.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

export function httpFactory(
    xhrBackend: XHRBackend, 
    requestOptions: RequestOptions, 
    loaderService: LoaderService,
    router: Router,
    userService: UserService): Http {
    return new InterceptedHttp(
        xhrBackend, 
        requestOptions, 
        loaderService, 
        router, 
        userService);
}