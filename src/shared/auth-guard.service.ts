import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  token: string;

  constructor(private router: Router, private userService: UserService) {
    this.userService.token.subscribe((val: string) => {
        this.token = val;
    });
  }

  canActivate() {

    if (this.token == undefined) {
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