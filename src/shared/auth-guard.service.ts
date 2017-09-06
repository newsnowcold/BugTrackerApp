import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {

  }

  canActivate() {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = (currentUser) ? currentUser.token : undefined;
    
    if (currentUser == undefined) {
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