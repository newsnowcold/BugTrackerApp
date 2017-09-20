import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from "@angular/http";
import { UserService } from '../shared/user.service';
import { IssueStatusAndPriority } from '../shared/issue-prio-status.service';
declare var $:any;
declare var moment:any;



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
    description: undefined,
    priority: undefined,
  };
  
  projects: any = new Array();
  users: any = new Array();
  modal: any;
  selectedProject: any;
  issues: any = new Array();
  currentUser: any;
  currentUserId: number;
  statusTypes: any;
  priorityTypes: any;


  @Input() selectedPriorityType: any;
  @Input() toUpdateBug: any;
  @Input() toRemoveBug: any;

  @Output() output = new EventEmitter<any>();

  constructor(private http: Http,
              private router: Router,
              private userService: UserService,
              private issueStatusAndPriority: IssueStatusAndPriority) {

    this.currentUser = userService.getUser();
    this.currentUserId = userService.getUserId();
    this.getPriorityTypes();
    this.getStatusTypes();
  }

  ngOnInit() {
    this.getProjects();
    this.initializeModals();
  }

  private getPriorityTypes() {
    this.issueStatusAndPriority.getPriorityTypes().subscribe(
      data => {
        this.priorityTypes = data;
        this.selectedPriorityType = data[0];
      }
    )
  }

  private getStatusTypes() {
    this.issueStatusAndPriority.getStatuses().subscribe(
      data => {
        this.statusTypes = data;
      }
    )
  }

  private selectProject(p) {
    this.selectedProject = p;
    this.getIssues(this.selectedProject.Id);
  }

  private updateBugStatus() {
    this.http.patch('Issue/Project/' + this.selectedProject.Id , {
      IssueId: this.toUpdateBug.Id,
      StatusId: this.toUpdateBug.StatusId,
      ResolutionSummary: this.toUpdateBug.ResolutionSummary
    })
    .subscribe(
        result => {
          this.getIssues(this.selectedProject.Id);
        },
        err => console.log(err),
        () => {
          this.toUpdateBug = undefined;
          $(function () {
            $('#modal-updatebug').modal('hide');
          });
        }
    )
  }

  private openModalForUpdatingStatus(bugData) {
    $('#modal-updatebug').modal('show');
    this.toUpdateBug = <any> JSON.parse(JSON.stringify(bugData));

    this.output.emit(this.toUpdateBug);
  }

  private doneAddingBug() {
    this.issue.title = undefined;
    this.issue.description = undefined;
    this.issue.priority = undefined;
    this.selectedPriorityType = this.priorityTypes[0];

    $(function () {
      $('#modal-reportbug').modal('toggle');
    });
  }

  private getIssues(projectId) {
    this.http.get('Issue/Project/' + projectId)
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

                    if (data.length > 0) {
                      this.selectedProject = data[0];
                      this.getIssues(data[0].Id);
                    }
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

  private saveBug() {

    this.http.post('Issue/Project/' + this.selectedProject.Id, {
      Title: this.issue.title,
      Description: this.issue.description,
      PriorityId: this.selectedPriorityType.Id
    })
    .subscribe(
        result => {
          this.getIssues(this.selectedProject.Id);
        },
        err => this.doneAddingBug(),
        () => this.doneAddingBug()
    )
  }

  private openModalForRemovingBug(bug) {
    $('#modal-removeBug').modal('show');
    this.toRemoveBug = <any> JSON.parse(JSON.stringify(bug));

    this.output.emit(this.toRemoveBug);
  }

  private removeBug() {
    let url = 'Issue/Project/' + this.selectedProject.Id + '/';
    this.http.delete(url + this.toRemoveBug.Id, {})
    .subscribe(
        result => {
          this.getIssues(this.selectedProject.Id);
        },
        err => {},
        () => {
          $('#modal-removeBug').modal('hide');
          this.toRemoveBug = undefined;
        }
    )
  }

  private openModalForUpdatingIssueObject(issue) {
    $('#modal-updatebugticket').modal('show');
    this.toUpdateBug = <any> JSON.parse(JSON.stringify(issue));

    this.output.emit(this.toUpdateBug);
  }

  private updatebugticket() {
    this.http.put('Issue/Project/' + this.selectedProject.Id, {
      Id: this.toUpdateBug.Id,
      Title: this.toUpdateBug.Title,
      Description: this.toUpdateBug.Description,
      PriorityId: this.toUpdateBug.PriorityId
    })
    .subscribe(
        result => {
          this.getIssues(this.selectedProject.Id);
        },
        err => this.toUpdateBug = undefined,
        () => {
          this.toUpdateBug = undefined;
          $('#modal-updatebugticket').modal('hide');
        }
    )
  }

  // helper methods
  private utcToLocalTime(timeString) {
    if (!timeString) return;

    var utcDate = new Date(timeString.replace('T', ' ')),
        offset = new Date().getTimezoneOffset(),
        timeZoneDiff = offset + utcDate.getTimezoneOffset();
    
    var localTime = new Date(utcDate.getTime() + (timeZoneDiff * 60 * 1000));

    return moment(localTime).format('MM/DD/YYYY h:mm a');
  }

  private getIssuesHandler(data: any) {
    this.issues = [];

    for (var i = 0; i < data.length; i++) {      
      var issue = data[i];
      issue['index'] = (i + 1);
      issue.DateCreated = this.utcToLocalTime(issue.DateCreated);
      issue.DateClosed = this.utcToLocalTime(issue.DateClosed);
      issue.LastUpdateDate = this.utcToLocalTime(issue.LastUpdateDate);
      this.issues.push(issue);
    }

    this.output.emit(this.issues);
  }

  private getUsersHandler(data: any) {
    for (var i = 0; i < data.length; i++) {
      
      if (data[i].Id == this.currentUserId) {
        data[i]['isCurrentUser'] = true
      };
      
      data[i]['isSelected'] = false;
    }

    this.users = data;
  }

  private initializeModals() {
    this.modal = {
      project: {
        IsProjectPhase: true
      }
    }
  }

}
