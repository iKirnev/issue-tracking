import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Issue } from '../_models';

@Injectable()
export class IssueService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Issue[]>(`${environment.apiUrl}/issues`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/issues/` + id);
    }

    create(issue: any) {
        // return this.http.post(`${environment.apiUrl}/issues`, issue);

        const formData: FormData = new FormData();
        if (issue.file) formData.append('file', issue.file, issue.file.name);
        formData.append('reporter_id', issue.reporter_id);
        formData.append('description', issue.description || '');
        formData.append('status_id', issue.status_id);
        return this.http.post(`${environment.apiUrl}/issues`, formData)
    }

    update(issue: Issue) {
        return this.http.put<Issue>(`${environment.apiUrl}/issues/` + issue.id, issue);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/issues/` + id);
    }
}