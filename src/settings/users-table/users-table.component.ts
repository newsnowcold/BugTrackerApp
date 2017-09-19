import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/usersService/users.service';
import { HandyDandyTools } from '../../shared/handyDandy';

declare var $:any;

@Component({
  selector: 'app-user-settings-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: any;
  inviteEmail: string;

  constructor(private userService: UsersService,
              private handyDandyTools: HandyDandyTools) { }

  ngOnInit() {
    this.getUsersData();
  }

  getUsersData = function () {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.processProjectList(data);
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

  inviteUsers = function () {
    this.userService.InviteUser(this.inviteEmail)
      .subscribe(
        data => {;
          this.getUsersData();
        },
        err => {
          console.log(err)
        },
        () => {
          $('#modal-inviteUser').modal('hide');
          this.inviteEmail = undefined;
        }
      )
  }

  // HELPER FUNCTION/METHODS
  private processProjectList(data) {
    this.users = [];

    for (var i = 0; i < data.length; i++) {      
      var user = data[i];
      user['index'] = (i + 1);
      user.JoinedDate = this.handyDandyTools.utcToLocalTime(user.JoinedDate);
      user.JoinedDate = this.handyDandyTools.utcToLocalTime(user.JoinedDate);
      this.users.push(user);
    }
  }

}
