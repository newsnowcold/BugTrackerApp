import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/Services/projectService/project.service';
import { UserService } from '../shared/Services/appUserService/appUser.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private http: Http
  ) { }

  ngOnInit() {
    this.checkUserUpdates();
  }


  public checkUserUpdates() {
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
