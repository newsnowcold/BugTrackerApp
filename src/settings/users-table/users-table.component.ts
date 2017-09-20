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
  toRemoveUser: any;

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
          this.inviteEmail = undefined;
        },
        err => {
          this.inviteEmail = undefined;
        },
        () => {
          $('#modal-inviteUser').modal('hide');
          this.inviteEmail = undefined;
        }
      )
  }

  planToRemoveUser = function (user) {
    this.toRemoveUser = user;
    $("#modal-removeUser").modal('show');
  }

  removeUser = function () {
    this.userService.removeUser(this.toRemoveUser.UserId)
      .subscribe(
        data => {;
          this.getUsersData();
          this.toRemoveUser = undefined;
        },
        err => {
          $("#modal-removeUser").modal('hide');
          this.toRemoveUser = undefined;
        },
        () => {
          $("#modal-removeUser").modal('hide');
          this.toRemoveUser = undefined;
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
