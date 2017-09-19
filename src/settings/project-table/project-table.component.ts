import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/projectService/project.service';
import { HandyDandyTools } from '../../shared/handyDandy';
import { UsersService } from '../../shared/usersService/users.service';

declare var $: any;

@Component({
  selector: 'app-project-settings-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {

  projects: any;
  selectedProject: any;
  projectMembers: any[];
  newProjectMembers: any[];
  users: any[];
  toAddUser: any;


  constructor(private projectService: ProjectService,
    private usersService: UsersService,
    private handyDandyTools: HandyDandyTools) { }

  ngOnInit() {
    this.getProjectsData();
  }

  // user invoke events
  selectProject = function (project) {
    this.selectedProject = project;

    this.getMembers();
  }

  getProjectsData = function () {
    this.projectService.getProjects()
      .subscribe(
      data => {
        this.processProjectList(data);
      },
      error => {
        console.log('error')
      },
      () => {
        console.log('done')
      })
  }

  getMembers = function () {
    let projectId = this.selectedProject.Id;
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

  stateToAddMember = function (user) {
    this.toAddUser = user;
  }

  addAsProjectMember = function () {
    var actionAllowed = true;
    var memberName = this.toAddUser.FirstName + ' ' + this.toAddUser.LastName;
    var newMember = {
      Name: memberName,
      Id: this.toAddUser.UserId
    };

    for (var i = 0; i < this.newProjectMembers.length; i++) {
      if (newMember.Id == this.newProjectMembers[i].Id) {
        actionAllowed = false;
      }
    }

    if (actionAllowed) this.newProjectMembers.push(newMember);    
    this.toAddUser = undefined;
  }

  openModalToModifyMembers = function () {
    if (!this.selectedProject) return;
    
    this.newProjectMembers = undefined;

    $('#modify-members-modal').modal('show');
    this.getAllUsers();

    this.newProjectMembers = this.handyDandyTools.copyObj(this.projectMembers);
  }

  saveNewSetOfMembers = function () {
    var obj:any[] = new Array();
    // {
    //     public int UserId { get; set; }
    // }

    var members = this.newProjectMembers;
    for (var i = 0; i < members.length; i++) {
      obj.push({
        UserId: members[i].Id
      })
    };

    this.projectService.updateProjectMembers(
      this.selectedProject.Id,
      obj)
      .subscribe(
        data => {
          this.getProjectsData();
          this.handleUpdateProjectMembers();
        },
        error => {
          $('#modify-members-modal').modal('hide');
          this.getProjectsData();
          this.handleUpdateProjectMembers();
        },
        () => {
          $('#modify-members-modal').modal('hide');
          // this.getProjectsData();
        })

  }

  getAllUsers = function () {
    this.usersService
      .getUsers()
      .subscribe(
      data => {
        this.users = data;
        console.log(data)
      },
      error => {
        console.log('error')
      },
      () => {
        console.log('done')
      })
  }

  removeFromMembers = function (member) {
    for (var i = 0; i < this.newProjectMembers.length; i++) {
      var _member = this.newProjectMembers[i];
      if (member.Id == _member.Id) {
        this.newProjectMembers.splice(i, 1);
        return;
      }
    }
  }

  // HELPER FUNCTION/METHODS
  private processProjectList(data) {

    this.projects = [];

    for (var i = 0; i < data.length; i++) {
      var project = data[i];
      project['index'] = (i + 1);
      project.DateCreated = this.handyDandyTools.utcToLocalTime(project.DateCreated);
      project.DateModified = this.handyDandyTools.utcToLocalTime(project.DateModified);
      this.projects.push(project);
    }

  }

  private handleUpdateProjectMembers() {
    console.log('putang ina wala nako kasabot!')
    this.projectMembers = this.handyDandyTools.copyObj(this.newProjectMembers);
    this.newProjectMembers = undefined;
  }
}
