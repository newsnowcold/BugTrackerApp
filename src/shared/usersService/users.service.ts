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
                        .map((res) => this.extractData(res))
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }

    InviteUser(emailAddress:string) : Observable<any> {
        var redirectUrl = window.location.protocol + '//' + window.location.host;
        var inviteUserUrl = "User/Invite?redirectUrl=" + redirectUrl;

        return this.http.post(inviteUserUrl, {
                            EmailAddress: emailAddress
                        })
                        .map((res) => this.extractData(res))
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
                        
    }

    private extractData(res: any) {        
        return res.text() ? res.json() : {}; ;
    }
}