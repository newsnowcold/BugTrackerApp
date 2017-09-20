import { Injectable } from '@angular/core';
import { CanActivate, 
        CanActivateChild, 
        Router, 
        ActivatedRouteSnapshot, 
        RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  token: string;
  user: any;
  userRole: any;
  currentState: any;

  constructor(private router: Router, private userService: UserService) {
    this.userService.token.subscribe((val: string) => {
        this.token = val;
    });

    this.userService.user.subscribe((val: any) => {
        this.user = val;
    });

    this.userService.userRole.subscribe((val: any) => setTimeout(() => {
        this.userRole = val;

        if (!this.checkUserAccess(this.userRole, this.currentState.url)) {
          this.router.navigate(['']);
        }

    }, 0));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentState = state;

    // check if user is authenticated to access
    if (this.token == undefined) {
      this.router.navigate(['/auth']);
      return false;

    } else if (!this.user || this.user.userId < 1) {

      this.router.navigate(['complete-registration']);
      return false;
    }

    return this.checkUserAccess(this.userRole, state.url);;
  }
  

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

  checkUserAccess = function (userRole: string, url: string): boolean {
    //  Admin
    //  User
    //  SuperAdmin
    if (userRole == "User" && url == "/settings") {
      alert("You don't have enough access to this page.");
      return false;
    }

    return true;
  }

}