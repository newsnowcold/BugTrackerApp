import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";

@Component({
    selector: 'app-request-change-password',
    templateUrl: './request-change-password.component.html',
    styleUrls: ['./request-change-password.component.css']
})
export class RequestChangePasswordComponent implements OnInit {

    email: string;

    constructor(
        private http: Http
    ) { }

    ngOnInit() {
    }


    sendForgotPassword = function () {
        var url = "Account/RequestResetPassword";
        url += "?redirectUrl=http://localhost:4200/set-new-password";

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
