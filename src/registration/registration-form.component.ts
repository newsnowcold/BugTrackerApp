import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  firstName: string;
  lastName: string;


  constructor(private http: Http,
              private router: Router,
              private userService: UserService) { 

    this.userService.user.subscribe((val: any) => {
        if (val.userId > 0) {
          this.router.navigate(['']);
        }
    });
  }

  ngOnInit() {
  }

  completeRegistration = function () {
    this.http.post('User/complete-registration', {
      FirstName: this.firstName,
      LastName: this.lastName
    })
    .subscribe(
        result => {
            var data = result.json();
            this.userService.setUser(data.UserName, data.UserId)
            this.router.navigate(['']);
        },
        error => console.log(error),
        () => console.log('done')
    );
  }

}
