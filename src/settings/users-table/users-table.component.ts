import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/Services/usersService/users.service';
import { HandyDandyTools } from '../../shared/Services/handyToolsService/handyDandy.service';

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
  toUpdateUserRole: any;
  roles: string[];
  newRole: string;

  constructor(private userService: UsersService,
              private handyDandyTools: HandyDandyTools) { }

  ngOnInit() {
    this.getUsersData();
    this.getRoles();
  }

  getRoles = function () {
    this.userService.getRoles()
      .subscribe(
        data => {
          this.roles = data;
        },
        err => {
          console.log(err)
        },
        () => {
          console.log('done')
        }
      )
  }


  updateRole = function () {
    this.userService.updateUserRole(this.newRole, this.toUpdateUserRole.UserId)
    .subscribe(
      data => {
        $("#modal-upateUserRole").modal('hide');
        alert("User role updated!");
        this.getUsersData();
      },
      err => {
        alert(err);
      },
      () => {
        this.newRole = undefined;
        this.toUpdateUserRole = undefined;
      }
    )
  }

  getUsersData = function () {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.processProjectList(data);
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

  planToUpdateTole = function (user) {
    this.toUpdateUserRole = user;
    $("#modal-upateUserRole").modal('show');
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
