import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../shared/projectService/project.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }


}
