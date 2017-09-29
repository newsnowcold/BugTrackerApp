import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/Services/projectService/project.service';
import { UserService } from '../shared/Services/appUserService/appUser.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private http: Http
  ) { }

  ngOnInit() {

  }

}
