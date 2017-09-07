import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
declare var $:any;
// import { ApiService } from '../../shared/api.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  providers: [],
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  username: string;
  password: string;

  constructor(private http: Http, 
              private router: Router,
              private userService: UserService) {};

  ngOnInit() {
  }

  login () {
    let headers = new Headers();
    let data = $.param({ username: this.username, password: this.password, grant_type: 'password' });
    
    headers.append('Content-type', 'application/x-www-form-urlencoded');
    
    this.http.post('token', data, {
      headers: headers
    })
    .subscribe(
        (result: any) => {
            var data = result.json();
            this.handleResult(data);
        }
    )
  }

  private handleResult(data: any) {
    this.userService.saveToken(data);
    this.router.navigate(['']);
  }


}
