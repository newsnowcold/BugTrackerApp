/*
    Credits:
    https://scotch.io/@kashyapmukkamala/using-http-interceptor-with-angular2
*/

import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "../environments/environment";
import { LoaderService } from '../shared/loader.service';

@Injectable()
export class InterceptedHttp extends Http {

    constructor(backend: ConnectionBackend, 
                defaultOptions: RequestOptions,
                private loaderService: LoaderService) {  
        
        super(backend, defaultOptions);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options))   
                    .catch(this.onCatch)
                    .do((res: Response) => {
                        this.onSuccess(res);
                    }, (error: any) => {
                        this.onError(error);
                    })
                    .finally(() => {
                        this.onEnd();
                    });
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options))
                    .catch(this.onCatch)
                    .do((res: Response) => {
                        this.onSuccess(res);
                    }, (error: any) => {
                        this.onError(error);
                    })
                    .finally(() => {
                        this.onEnd();
                    });
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options))   
                    .catch(this.onCatch)
                    .do((res: Response) => {
                        this.onSuccess(res);
                    }, (error: any) => {
                        this.onError(error);
                    })
                    .finally(() => {
                        this.onEnd();
                    });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options))   
                    .catch(this.onCatch)
                    .do((res: Response) => {
                        this.onSuccess(res);
                    }, (error: any) => {
                        this.onError(error);
                    })
                    .finally(() => {
                        this.onEnd();
                    });
    }

    
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    private onError(ada: any): void {
       // this.hideLoader();
    }

    private onSuccess(asda: any): void {
       // this.hideLoader();
    }

    private onEnd(): void {
       this.loaderService.display(false);
    }

    private updateUrl(req: string) {
        this.loaderService.display(true);
        return  environment.origin + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        

        let jsonData = JSON.parse(localStorage.getItem('currentUser'));
        
        let token = '';
        if (jsonData && jsonData.access_token) {
            token = jsonData.token_type + ' ' + jsonData.access_token;
        }

        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Authorization', token);
        }
        
        return options;
    }
}