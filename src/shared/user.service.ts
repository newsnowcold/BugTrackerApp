
// Imports
import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class UserService {
    
    public token: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

    //token: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    private _username: string;
    private _userId: number;
    private _tokenType: string;
    // if you want to change the name of localStorage, check the interceptor too
    private l_storageName = 'currentUser';

    constructor(private router: Router) {
        this.initializeToken();
    }


    public getUser() {
        return this._username;
    }

    public getUserId() {
        return  this._userId;
    }

    private setToken(token: string) {
        var fullToken = this._tokenType + ' ' + token;

        this.token.next(fullToken);
    }

    public saveToken(data: any) {
        var jsonData = JSON.stringify(data);
        localStorage.setItem(this.l_storageName, jsonData);

        this.initializeToken();
    }

    public removeToken() {
        localStorage.removeItem(this.l_storageName);
        this.resetVariables();
        this.router.navigate(['/auth']);
    }

    // Helper functions/methods

    private processLoginReponse(jsonData: any) {
        this._tokenType = jsonData.token_type;
        this._username = jsonData.userName;
        this._userId = jsonData.userId;
        this.setToken(jsonData.access_token)
    }

    private initializeToken() {
        var jsonData = JSON.parse(localStorage.getItem(this.l_storageName));
        
        if (jsonData) this.processLoginReponse(jsonData);
    }

    private resetVariables() {
        this.token.next(undefined);
        this._username = undefined;
        this._tokenType = undefined;
        this._userId = undefined;
    }


}