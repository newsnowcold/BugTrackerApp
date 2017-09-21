import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../shared/user.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    oldPass: string;
    newPass: string;
    newPassConfirm: string;
    currentUser: any;

    constructor(
        private http: Http,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.getUserInfo();
    }


    getUserInfo = function () {
        this.http.get("Account")
            .subscribe(
            result => {
                this.currentUser = result.json();
            },
            err => {
                // alert("failed");
            },
            () => {
                this.oldPass = "";
                this.newPass = "";
                this.newPassConfirm = "";
            })
    }

    updateUserProfile = function () {
        this.http.patch("User/" + this.currentUser.UserId, {
            FirstName: this.currentUser.FirstName,
            LastName: this.currentUser.LastName
        })
            .subscribe(
            result => {
                alert("New profile saved.");
            },
            err => {
                // alert("failed");
            },
            () => { }
            )
    }

    changePassword = function () {
        this.http.post("Account/ChangePassword", {
            OldPassword: this.oldPass,
            NewPassword: this.newPass,
            ConfirmPassword: this.newPassConfirm
        })
            .subscribe(
            result => {
                alert("New password saved.");
            },
            err => {
                // alert("failed");
            },
            () => {
                this.oldPass = "";
                this.newPass = "";
                this.newPassConfirm = "";
            })
    }

}
