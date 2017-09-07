import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private userService: UserService) {

  }

  canActivate() {

    var token = this.userService.getToken();

    if (token == undefined) {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

}