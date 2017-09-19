import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  token: string;
  user: any;

  constructor(private router: Router, private userService: UserService) {
    this.userService.token.subscribe((val: string) => {
        this.token = val;
    });

    this.userService.user.subscribe((val: any) => {
        this.user = val;
    });
  }

  canActivate() {
    console.log(this.user)
    if (this.token == undefined) {

      this.router.navigate(['/auth']);
      return false;

    } else if (!this.user || this.user.userId < 1) {

      this.router.navigate(['complete-registration']);
      return false;
      
    }

    return true;
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

}