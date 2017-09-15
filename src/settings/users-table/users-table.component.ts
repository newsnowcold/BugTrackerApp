import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/usersService/users.service';

@Component({
  selector: 'app-user-settings-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: any;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getUsersData();
  }

  getUsersData = function () {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(data)
        },
        err => {
          console.log(err)
        },
        () => {
          console.log('done')
        }
      )
  }

}
