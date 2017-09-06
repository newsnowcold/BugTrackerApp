
// Imports
import { Injectable }     from '@angular/core';
import { HttpModule, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
    private baseUrl = "http://localhost:4000/api/";
    private fullRequestUrl: string;

    constructor(private http: Http) {
        console.log('api service contructor')
    }

    public get(url: string, options?: RequestOptionsArgs) {

        this.fullRequestUrl = this.baseUrl + url;

        return this.http.get(this.fullRequestUrl)
                        // and calling .json() on the response to return data
                        .map((res: Response) => res.json());
    }

    //http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
    public post(url: string, body: any, options?: RequestOptionsArgs) {
        
        this.fullRequestUrl = this.baseUrl + url;
        
        this.http.post(this.fullRequestUrl,body)
                        // and calling .json() on the response to return data
                        .map((res: Response) => res.json())
                        .subscribe(
                            data => console.log(data),
                            err => this.errorHandler(err),
                            () => console.log('Random Quote Complete')
                          );
    }

    private errorHandler(eror: any) {
        // do something here
        console.log('error');
        return eror;
    }

    private completeRequestHandler () {
        console.log('completed');
    }
}