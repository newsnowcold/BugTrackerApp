import { Component } from '@angular/core';
import { LoaderService } from '../shared/loader.service';
import { UserService } from '../shared/user.service';
import { Http } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    showLoader: boolean;

    constructor(
        private loaderService: LoaderService,
        private userService: UserService,
        private http: Http) {
    }

    ngOnInit() {
        this.checkUserUpdates();

        this.loaderService.status.subscribe((val: boolean) => setTimeout(() => {
            this.showLoader = val;
        }, 0));
    }


    public checkUserUpdates() {
        this.http.get('account')
            .subscribe(
            result => {
                var data = result.json();
                
                this.userService.setUserRole(data[0].Role)
            },
            err => console.log(err),
            () => { console.log('done') }
            )
    }

}
