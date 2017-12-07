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
    
    getRoles() : Observable<any> {
        return this.http.get("UserRole")
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

    updateUserRole(newRole: string, userId: number): Observable<any> {
        var url = "UserRole/" + userId;

        return this.http.patch(url, { UserRole: newRole })
                        .map((res) => this.extractData(res))
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
                        
    }

    getUsers() : Observable<any> {
        return this.http.get("User")
                        .map((res) => this.extractData(res))
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }

    removeUser(userId:number) : Observable<any> {
        
        return this.http.delete("User/" + userId, {})
                        .map((res) => this.extractData(res))
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));                
    }

    private extractData(res: any) {        
        return res.text() ? res.json() : {}; ;
    }
}