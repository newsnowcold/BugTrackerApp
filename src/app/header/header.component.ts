import { Component, OnInit } from '@angular/core';
import { UserService, IUserObserver } from '../../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, IUserObserver {
  currentUser: string;

  constructor(private userService: UserService) { 
    userService.subscribe(this);
  }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
  }

  logout() {
    this.userService.removeToken();
    this.currentUser = undefined;
  }

  excute() {
    this.currentUser = this.userService.getUser();
  }

  

}
