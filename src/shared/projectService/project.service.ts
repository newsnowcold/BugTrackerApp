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
                        .map((res) => res.json())
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }

    getProjectMembers(projectId: number): Observable<any> {
        return this.http.get("Project/" + projectId+ "/members")
                        .map((res) => res.json())
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }

    createProject(obj: CreateProjectModel) : Observable<any> {
        return this.http.post("PriorityType", obj)
                        .map((res) => res.json())
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }
}