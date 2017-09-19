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
  projectMembers: any;
  newProjectMembers: any[] = new Array();


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
    this.projectService
      .getProjects()
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
