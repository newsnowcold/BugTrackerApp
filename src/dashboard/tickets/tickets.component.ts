import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from "@angular/http";
import { UserService } from '../../shared/Services/appUserService/appUser.service';
import { IssueStatusAndPriority } from '../../shared/Services/statusAndPriorityService/statusAndPriority.service';
import { ProjectService } from '../../shared/Services/projectService/project.service';
import { NestedAccordionComponent } from '../nested-accordion/nested-accordion.component';

declare var $: any;
declare var moment: any;



@Component({
    selector: 'ticket-table',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
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
    statusTypeFilter: any;
    priorityTypeFilter: any;
    projectMembers: any;
    assignTicketTo: any;


    @Input() selectedPriorityType: any;
    @Input() toUpdateBug: any;
    @Input() toRemoveBug: any;

    @Output() output = new EventEmitter<any>();

    constructor(private http: Http,
        private router: Router,
        private userService: UserService,
        private projectService: ProjectService,
        private issueStatusAndPriority: IssueStatusAndPriority) {

        this.currentUser = userService.getUser();
        this.currentUserId = userService.getUserId();
        this.getPriorityTypes();
        this.getStatusTypes();
    }

    ngOnInit() {
        this.getProjects();
        this.initializeModals();

        $( function() {
            $('#startDate').datepicker({ dateFormat: 'mm/dd/yy' });
            $('#endDate').datepicker({ dateFormat: 'mm/dd/yy' });
        })
    }

    

    openModalForUpdatingStatus(bugData) {
        $('#modal-updatebug').modal('show');
        if (!bugData) return;
        this.toUpdateBug = <any>JSON.parse(JSON.stringify(bugData));

        this.output.emit(this.toUpdateBug);
    }

    
    saveBug() {

        var errorMsg = this.validateCreationOfTicket();

        if (errorMsg != "") {
            alert(errorMsg);
            return;
        }

        this.http.post('Issue/Project/' + this.selectedProject.Id, {
            Title: this.issue.title,
            Description: this.issue.description,
            PriorityId: this.selectedPriorityType.Id,
            AssingTo: this.assignTicketTo.Id,
            StartDate: $('#startDate').val(),
            EndDate: $('#endDate').val()
        })
            .subscribe(
            result => {
                this.getIssues(this.selectedProject.Id);
            },
            err => this.doneAddingBug(),
            () => this.doneAddingBug()
            )
    }

    openModalForRemovingBug(bug) {
        $('#modal-removeBug').modal('show');
        this.toRemoveBug = <any>JSON.parse(JSON.stringify(bug));

        this.output.emit(this.toRemoveBug);
    }

    openModalForUpdatingIssueObject(issue) {
        $( function() {
            $('#updateStartDate').datepicker({ dateFormat: 'mm/dd/yy' });
            $('#updateEndDate').datepicker({ dateFormat: 'mm/dd/yy' });
            $('#updateStartDate').datepicker('setDate', new Date(issue.StartDate));
            $('#updateEndDate').datepicker('setDate', new Date(issue.EndDate));
            $('#modal-updatebugticket').modal('show');
        })
        this.toUpdateBug = <any>JSON.parse(JSON.stringify(issue));

        this.output.emit(this.toUpdateBug);
    }

    private validateCreationOfTicket() {
        var errorMsg = "";

        if (!this.issue || this.issue.title == undefined) {
            errorMsg += "\nTicket name is required";
        }

        if (!this.selectedPriorityType || this.selectedPriorityType.Id == undefined) {
            errorMsg += "\nTicket priority type is required.";
        }

        if (!this.assignTicketTo || this.assignTicketTo.Id == undefined) {
            errorMsg += "\nTicket assignment is required.";
        }

        if ($('#startDate').val() == "" || $('#startDate').val() == "") {
            errorMsg += "\nCheck start and end date of ticket.";
        }
        return errorMsg;
    }

    private updateTicketAssignment(member) {
        this.toUpdateBug.AssignedTo = member.Name;
        this.toUpdateBug.AssignedToId = member.Id;
    }

    private removeBug() {
        let url = 'Issue/Project/' + this.selectedProject.Id + '/';
        this.http.delete(url + this.toRemoveBug.Id, {})
            .subscribe(
            result => {
                this.getIssues(this.selectedProject.Id);
            },
            err => { },
            () => {
                $('#modal-removeBug').modal('hide');
                this.toRemoveBug = undefined;
            }
            )
    }

    private updatebugticket() {
        this.http.put('Issue/Project/' + this.selectedProject.Id, {
            Id: this.toUpdateBug.Id,
            Title: this.toUpdateBug.Title,
            Description: this.toUpdateBug.Description,
            PriorityId: this.toUpdateBug.PriorityId,
            AssingTo: this.toUpdateBug.AssignedToId,
            StartDate: $('#updateStartDate').val(),
            EndDate: $('#updateEndDate').val()
        })
            .subscribe(
            result => {
                this.getIssues(this.selectedProject.Id);
            },
            err => this.toUpdateBug = undefined,
            () => {
                this.toUpdateBug = undefined;
                $('#modal-updatebugticket').modal('hide');
                $('#updateStartDate').datepicker({ dateFormat: 'mm/dd/yy' });
                $('#updateEndDate').datepicker({ dateFormat: 'mm/dd/yy' });
            }
            )
    }

    // helper methods
    private utcToLocalTime(timeString: string, format?: string) {
        var defaultFormat = 'MM/DD/YYYY h:mm a';
        if (!timeString) return;

        var utcDate = new Date(timeString.replace('T', ' ') + ' UTC');

        var localTime = new Date(utcDate.toString());
        
        if (format) {
            defaultFormat = format;
        }

        return moment(localTime).format(defaultFormat);
    }

    private getIssuesHandler(data: any) {
        this.issues = [];

        for (var i = 0; i < data.length; i++) {
            var issue = data[i];
            issue['index'] = (i + 1);
            issue.DateCreated = this.utcToLocalTime(issue.DateCreated);
            issue.DateClosed = this.utcToLocalTime(issue.DateClosed);
            issue.LastUpdateDate = this.utcToLocalTime(issue.LastUpdateDate);
            issue.StartDate = this.utcToLocalTime(issue.StartDate, 'MM/DD/YYYY');
            issue.EndDate = this.utcToLocalTime(issue.EndDate, 'MM/DD/YYYY');
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

    private doneAddingBug() {
        this.issue.title = undefined;
        this.issue.description = undefined;
        this.issue.priority = undefined;
        this.selectedPriorityType = this.priorityTypes[0];
        this.assignTicketTo = undefined;

        $(function () {
            $('#modal-reportbug').modal('toggle');
        });
    }

    private getIssues(projectId) {
        this.getMembers(projectId);

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
                    this.getMembers(this.selectedProject.Id)
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

    // Preparing/Calling data for static objects
    private handleStatusTypesData = function (data) {
        this.statusTypeFilter = {};

        for (var i = 0; i < data.length; i++) {
            this.statusTypeFilter[data[i].Status] = true;
        }

        return data;
    }

    private getStatusTypes() {
        this.issueStatusAndPriority.getStatuses().subscribe(
            data => {
                this.statusTypes = this.handleStatusTypesData(data);
            }
        )
    }

    private selectMemberToAssign(member) {
        this.assignTicketTo = member;
    }

    private getMembers = function (projectId) {
        this.projectService.getProjectMembers(projectId)
          .subscribe(
          data => {
            this.projectMembers = data;
          },
          error => {
            console.log('error')
          },
          () => {
            console.log('done')
          })
      }



    
      private handlePriorityTypesData = function (data) {
        this.priorityTypeFilter = {};
        
        for (var i = 0; i < data.length; i++) {
            this.priorityTypeFilter[data[i].PriorityType1] = true;
        }

        return data;
    }

    private getPriorityTypes() {
        this.issueStatusAndPriority.getPriorityTypes().subscribe(
            data => {
                this.priorityTypes = this.handlePriorityTypesData(data);
                this.selectedPriorityType = data[0];
            }
        )
    }

    // Preparing/Calling data for dynamic data

    private selectProject(p) {
        this.selectedProject = p;
        this.getIssues(this.selectedProject.Id);
    }

    private updateBugStatus() {
        this.http.patch('Issue/Project/' + this.selectedProject.Id, {
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

}
