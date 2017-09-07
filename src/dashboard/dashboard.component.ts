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

  constructor(private http: Http,
              private router: Router) { }

  ngOnInit() {

    this.http.get('Project')
    .subscribe(
        (result: any) => {
            var data = result.json();
            this.projects = data;
        }
    )

  }

  addProject() {
    this.http.post('Project/Create', {
      Name: this.title,
      Description: this.description
    })
    .subscribe(
        (result: any) => {
            var data = result.json();
            this.handleResult(data);
        }
    )
  }

  handleResult(data: any) {
    this.title = undefined;
    this.description = undefined;

    $(function () {
      $('#modal-addProject').modal('toggle');
   });
  }

}
