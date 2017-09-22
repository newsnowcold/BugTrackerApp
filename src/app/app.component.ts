import { Component } from '@angular/core';
import { LoaderService } from '../shared/loader.service';
import { UserService } from '../shared/user.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    showLoader: boolean;
    unauthorizeRoutes: string[] = new Array("auth", "forgot-password", "set-new-password");

    constructor(
        private loaderService: LoaderService,
        private userService: UserService,
        private http: Http,
        private router:Router) {
    }

    ngOnInit() {
        this.checkUserUpdates();

        this.loaderService.status.subscribe((val: boolean) => setTimeout(() => {
            this.showLoader = val;
        }, 0));
    }


    public checkUserUpdates() {
        let currentUrl = this.router.url;

        if (this.unauthorizeRoutes.indexOf(currentUrl) != -1) return;
        
        this.http.get('account')
            .subscribe(
            result => {
                var data = result.json();
                
                this.userService.setUserRole(data.Role)
            },
            err => console.log(err),
            () => { console.log('done') }
            )
    }

}
