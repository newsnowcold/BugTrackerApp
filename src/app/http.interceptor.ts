/*
    Credits:
    https://scotch.io/@kashyapmukkamala/using-http-interceptor-with-angular2
*/

import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from "rxjs/Rx";
import { environment } from "../environments/environment";
import { LoaderService } from '../shared/loader.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Injectable()
export class InterceptedHttp extends Http {

    constructor(backend: ConnectionBackend, 
                defaultOptions: RequestOptions,
                private loaderService: LoaderService,
                private router: Router,
                private userService: UserService) {  
        
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

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.patch(url, body, this.getRequestOptionArgs(options))   
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

    private extractData(res: any) {        
        return res.text() ? res.json() : {}; ;
    }
    
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    private onError(error: any): void {

       var errData = this.extractData(error);

       if (errData.Code == 500) {
           alert("Error id: " + errData.Id + "\n" + errData.Message)
       } else if (errData.Code == 400) {
           var msg = errData.Message;
           msg += "See list of errors below:\n\n";

           for (var i = 0; i < errData.Errors.length; i++) {
               var error = errData.Errors[i];
               msg += error.Reason + "\n";
           }

           alert(msg);
       } else if (errData.Code == 401) {
            this.userService.removeToken();
            this.router.navigate(['/auth']);
       } else if (errData.Code == 403 ) {
            alert("You are forbidden for this action");
       }

       if (error.status == 401) {
            this.userService.removeToken();
            this.router.navigate(['/auth']);
       } else if  (error.status == 403 ) {
            alert("You are forbidden for this action");
       }
    }

    private onSuccess(data: any): void {
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