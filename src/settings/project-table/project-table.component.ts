import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/Services/projectService/project.service';
import { HandyDandyTools } from '../../shared/Services/handyToolsService/handyDandy.service';
import { UsersService } from '../../shared/Services/usersService/users.service';

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
  users: any[];
  toAddUser: any;
  toRemoveProject: any;

  //for creating new project
  new_projectName: string;
  new_projectDescription: string;


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

    var members = this.newProjectMembers;
    for (var i = 0; i < members.length; i++) {
      obj.push({
        UserId: members[i].Id
      })
    }

    this.projectService
      .updateProjectMembers(this.selectedProject.Id, obj)
      .subscribe(
        data => {
          this.projectMembers = data;
          this.getProjectsData();
        },
        error => {
          this.reinitializeUpdatingNewSetofMembers();
        },
        () => {
          this.reinitializeUpdatingNewSetofMembers();
        }
      )
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

  saveNewProject = function () {
    this.projectService.createProject({
        Name: this.new_projectName,
        Description: this.new_projectDescription
    })
    .subscribe(
      data => {
        this.getProjectsData();
      },
      error => {
        this.reInitializeAddNewProjectModels();
      },
      () => {
        this.reInitializeAddNewProjectModels();
      })
  }

  deleteProjectConfirmModal = function () {
    
  }

  editProjectDetails = function () {
    this.toEditProjectDetails = <any> JSON.parse(JSON.stringify(this.selectedProject));

    $('#modal-editProject-details').modal('show');
  }

  // poping modal to verify if user realy wanted ro remove project
  planToRemoveProject = function (project) {
    $("#modal-removeProject").modal('show');
    this.toRemoveProject = project;
  }

  // the confirmed action to remove the project
  removeProject = function () {
    this.projectService
      .removeProject(this.toRemoveProject.Id)
      .subscribe(
        data => {
          this.getProjectsData();
          this.reInitializeSelectedProject();
        },
        error => {
          $('#modal-removeProject').modal('hide');
        },
        () => {
          $('#modal-removeProject').modal('hide');
        }
      )
  }

  updateProjectDetails = function () {
    var obj = {
        Name: this.toEditProjectDetails.Name,
        Description: this.toEditProjectDetails.Description
    };

    this.projectService
      .updateProject(obj, this.selectedProject.Id)
      .subscribe(
        data => {
          this.getProjectsData();
          this.selectedProject.Description = this.toEditProjectDetails.Description;
          this.selectedProject.Name = this.toEditProjectDetails.Name;
        },
        error => {
          console.log('error')
        },
        () => {
          $('#modal-editProject-details').modal('hide');
        }
      )

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

  private reinitializeUpdatingNewSetofMembers() {
    $('#modify-members-modal').modal('hide');
    this.projectMembers = this.handyDandyTools.copyObj(this.newProjectMembers);
    this.newProjectMembers = undefined;
  }

  private reInitializeAddNewProjectModels() {
    $('#modal-addProject').modal('hide');
    this.new_projectName = undefined;
    this.new_projectDescription = undefined;
  }

  private reInitializeSelectedProject() {
    this.selectedProject = undefined;
    this.toRemoveProject = undefined;
    this.projectMembers = undefined;
  }
}
