import { Component, OnInit } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.css']
})
export class SetNewPasswordComponent implements OnInit {
  
  newPass: string;
  newPassConfirm:string;
  email: string;
  token: string;


  constructor(
    private http:Http,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.email = this.activatedRoute.snapshot.queryParams["email"];
    this.token = this.activatedRoute.snapshot.queryParams["token"];
  }


  setNewPassword = function () {
    var url = "Account/SetNewPassword";
    var data = {
      EmailAddress: this.email,
      NewPassword: this.newPass,
      ConfirmPassword: this.newPassConfirm,
      Token: this.token
    }
    this.http.post(url, data)
             .subscribe(
            result => {
                alert('Change password success');
                this.router.navigate(['/auth']);
            },
            error => console.log(error),
            () => console.log('done')
            );
  }
}
