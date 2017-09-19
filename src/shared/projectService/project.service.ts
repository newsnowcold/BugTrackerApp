import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CreateProjectModel } from './models/createProject';

@Injectable()
export class ProjectService {

    /**
     *
     */
    constructor(private http: Http) {
    }
    
    getProjects() : Observable<any> {
        return this.http.get("Project")
                        .map((res) => this.extractData(res))
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }

    getProjectMembers(projectId: number): Observable<any> {
        return this.http.get("Project/" + projectId+ "/members")
                        .map((res) => this.extractData(res))
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }

    createProject(obj: CreateProjectModel) : Observable<any> {
        return this.http.post("PriorityType", obj)
                        .map((res) => this.extractData(res))
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }

updateProjectMembers(projectId: number, members: any[]) : Observable<any> {
        var obj = { Members: members };
        return this.http.post("Project/" + projectId+ "/members", obj)
                        .map((res) => res.json())
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }
updateProject(obj: CreateProjectModel, projectId: number): Observable<any> {

        return this.http.put("Project/" + projectId, obj)
                        .map((res) => this.extractData(res))
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }


    // helper function / methods
    private extractData(res: any) {        
        return res.text() ? res.json() : {}; ;
    }

}
