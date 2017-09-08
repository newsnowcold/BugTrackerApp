import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Headers} from "@angular/http";
declare var $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string;
  description: string;
  projects: any;
  users: any;
  modal: any;

  constructor(private http: Http,
              private router: Router) { }

  ngOnInit() {
    this.getProjects();
    this.initializeModals();
    
  }
  addProject() {
    this.http.post('Project/Create', {
      Name: this.title,
      Description: this.description
    })
    .subscribe(
        result => {
            var data = result.json();
            this.getProjectsHandler(data);
        },
        err => console.log(err),
        () => this.done()
    )
  }

  done() {
    $(function () {
      // $('#modal-addProject').modal('toggle');
    });
  }

  private getProjects() {
    this.http.get('Project')
            .subscribe(
                (result: any) => {
                    var data = result.json();
                    this.projects = data;
                }
            );
  }

  private getUsers() {
    this.http.get('User')
            .subscribe(
              result => {
                var data = result.json();
                this.getUsersHandler(data);
              },
              err => console.log(err),
              () => this.done()
            )
  }


  // helper methods
  private getUsersHandler(data: any) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
      data[i]['isSelected'] = false;
    }

    this.users = data;
    console.log(this.users)
  }

  private getProjectsHandler(data: any) {
    this.title = undefined;
    this.description = undefined;
    this.modal.project.IsProjectPhase = false;
    this.getUsers();
    // this.getProjects();
  }

  private initializeModals() {
    this.modal = {
      project: {
        IsProjectPhase: true
      }
    }
  }

}
