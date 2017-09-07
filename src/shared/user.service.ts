
// Imports
import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';

export interface IUserObserver {
    excute();
}

export interface IUserObservable {
    subscribe(subscriber: IUserObserver);
    unsubscribe(subscriber: IUserObserver);
    publish();
}


@Injectable()
export class UserService implements IUserObservable {
    
    private _token: string;
    private _username: string;
    private _tokenType: string;
    // if you want to change the name of localStorage, check the interceptor too
    private l_storageName = 'currentUser';
    private observers: IUserObserver[];

    constructor(private router: Router) {
        this.observers = new Array();
        this.initializeToken();
    }

    
    public getUser() {
        return this._username;
    }

    public getToken() {
        var token = undefined;

        if (this._token != undefined) {
            token = this._tokenType + ' ' + this._token
        } 

        return token;
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

    public subscribe(subscriber: IUserObserver) {
        this.observers.push(subscriber);        
    }

    public unsubscribe(subscriber: IUserObserver) {
        this.observers = this.observers.filter((rob) => {
            return subscriber !== rob;
        });
    }

    public publish() {
        this.observers.forEach((subscriber) => {
           subscriber.excute();
        });        
    }

    // Helper functions/methods

    private processLoginReponse(jsonData: any) {
        this._tokenType = jsonData.token_type;
        this._username = jsonData.userName;
        this._token = jsonData.access_token;
    }

    private initializeToken() {
        var jsonData = JSON.parse(localStorage.getItem(this.l_storageName));
        
        if (jsonData) this.processLoginReponse(jsonData);
    }

    private resetVariables() {
        this._token = undefined;
        this._username = undefined;
        this._tokenType = undefined;
    }


}