import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class IssueStatusAndPriority {

    /**
     *
     */
    constructor(private http: Http) {
    }
    
    getStatuses() : Observable<any> {
        return this.http.get("Status")
                        .map((res) => res.json())
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }

    getPriorityTypes() : Observable<any> {
        return this.http.get("PriorityType")
                        .map((res) => res.json())
                        .catch((error) => Observable.throw(error.json.error || 'Server error'));
    }
}