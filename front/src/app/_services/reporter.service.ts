import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Reporter } from '../_models';

@Injectable()
export class ReporterService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Reporter[]>(`${environment.apiUrl}/reporters`);
    }

}