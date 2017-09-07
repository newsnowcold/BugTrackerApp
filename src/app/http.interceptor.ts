/*
    Credits:
    https://scotch.io/@kashyapmukkamala/using-http-interceptor-with-angular2
*/

import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "../environments/environment";

@Injectable()
export class InterceptedHttp extends Http {

    constructor(backend: ConnectionBackend, 
                defaultOptions: RequestOptions) {
        
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }
    
    private updateUrl(req: string) {
        return  environment.origin + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {


        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        let jsonData = JSON.parse(localStorage.getItem('currentUser'));
        let token = jsonData.token_type + ' ' + jsonData.access_token;

        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Authorization', token);

        return options;
    }
}