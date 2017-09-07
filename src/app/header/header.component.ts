import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: string;

  constructor(private userService: UserService) { 
  }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
  }

  logout() {
    this.userService.removeToken();
    this.currentUser = undefined;
  }

  

}
