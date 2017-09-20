import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/projectService/project.service';
import { UserService } from '../shared/user.service';
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
                
                this.userService.setUserRole(data[0].Role)
            },
            err => console.log(err),
            () => { console.log('done') }
            )
    }

}
