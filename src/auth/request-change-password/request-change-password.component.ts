import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";

@Component({
    selector: 'app-request-change-password',
    templateUrl: './request-change-password.component.html',
    styleUrls: ['./request-change-password.component.css']
})
export class RequestChangePasswordComponent implements OnInit {

    email: string;
    errorMsg: string;

    constructor(
        private http: Http
    ) { }

    ngOnInit() {
    }


    sendForgotPassword = function () {
        var url = "Account/RequestResetPassword";
        var redirectUrl = window.location.protocol + '//' + window.location.host;
        url += "?redirectUrl= " + redirectUrl + "/%23/set-new-password";
        url = 
        this.http.post(url, { Email: this.email })
            .subscribe(
            result => {
                alert('check email');
            },
            error => console.log(error),
            () => console.log('done')
            );
    }

}
