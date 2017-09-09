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
  project: any = {
    title: undefined,
    description: undefined
  };
  issue: any = {
    title: undefined,
    description: undefined
  };
  projects: any = new Array();
  users: any = new Array();
  modal: any;
  selectedProject: any;
  issues: any = new Array();

  constructor(private http: Http,
              private router: Router) { }

  ngOnInit() {
    this.getProjects();
    this.initializeModals();    
  }

  private addProject() {
    this.http.post('Project', {
      Name: this.project.title,
      Description: this.project.description
    })
    .subscribe(
        result => {
            var data = result.json();
            this.getProjectsHandler(data);
        },
        err => console.log(err)
    )
  }

  private addMembers() {
    let addMembersUrl = 'Project/' + this.selectedProject.Id + '/members';
    let tobeNewMembers = new Array();

    for(var i = 0; i < this.users.length; i++) {
      if (this.users[i].isSelected) {
        tobeNewMembers.push({
          "UserId": this.users[i].Id
        });
      }
    }

    this.http.post(addMembersUrl, {
      Members: tobeNewMembers
    })
    .subscribe(
        result => {
            console.log(result);
        },
        err => console.log(err),
        () => this.done()
    )
  }

  private done() {
    $(function () {
      $('#modal-addProject').modal('toggle');
    });
  }

  private doneAddingBug() {
    this.issue.title = undefined;
    this.issue.description = undefined;
    $(function () {
      $('#modal-reportbug').modal('toggle');
    });
  }

  private getIssues(projectId) {
    this.http.get('Issue/' + projectId)
            .subscribe(
                result => {
                  var data = result.json();
                  this.getIssuesHandler(data);
                },
                err => console.log()
            );
  }

  private getProjects() {
    this.http.get('Project')
            .subscribe(
                (result: any) => {
                    var data = result.json();
                    this.projects = data;

                    this.selectedProject = data[0];
                    this.getIssues(data[0].Id);
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
              err => console.log(err)
            )
  }

  private save() {
    if (this.modal.project.IsProjectPhase) {
      this.addProject();
    } else {
      this.addMembers();
    }
  }

  private saveBug() {
    this.http.post('Issue/' + this.selectedProject.Id, {
      Title: this.issue.title,
      Description: this.issue.description
    })
    .subscribe(
        result => {
          this.getIssues(this.selectedProject.Id);
        },
        err => console.log(err),
        () => this.doneAddingBug()
    )
  }


  // helper methods
  private utcToLocalTime(timeString) {
    if (!timeString) return;

    var time = new Date(timeString.replace('T', ' '))
    return time.toLocaleDateString();
  }

  private getIssuesHandler(data: any) {
    this.issues = [];

    for (var i = 0; i < data.length; i++) {
      var issue = data[i];
      issue['index'] = (i + 1);
      issue.DateCreated = this.utcToLocalTime(issue.DateCreated);
      issue.DateClosed = this.utcToLocalTime(issue.DateClosed);

      this.issues.push(issue);
    }
  }

  private getUsersHandler(data: any) {
    for (var i = 0; i < data.length; i++) {
      data[i]['isSelected'] = false;
    }

    this.users = data;
  }

  private getProjectsHandler(data: any) {
    this.project.title = undefined;
    this.project.description = undefined;
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
