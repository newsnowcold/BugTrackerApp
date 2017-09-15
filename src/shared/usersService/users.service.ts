import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

    /**
     *
     */
    constructor(private http: Http) {
    }
    
    getUsers() : Observable<any> {
        return this.http.get("User")
                        .map((res) => res.json())
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }
}