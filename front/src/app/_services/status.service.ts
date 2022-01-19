import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Status } from '../_models';

@Injectable()
export class StatusService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Status[]>(`${environment.apiUrl}/statuses`);
    }

}