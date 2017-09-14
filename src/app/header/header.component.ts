import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: string;
  token: string;

  constructor(private userService: UserService,
              private router: Router) { 
    this.userService.token.subscribe((val: string) => {
        this.token = val;
    });
  }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
  }

  logout() {
    this.userService.removeToken();
    this.currentUser = undefined;
  }

  goto(path) {
    this.router.navigate([path]);
  }
}
