import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private apiUrl = 'https://localhost:7211/api/issues';
  private http = inject(HttpClient)

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.apiUrl);
  }

  getIssue(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/${id}`);
  }

  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.apiUrl, issue);
  }

  updateIssue(id: number, issue: Issue): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, issue);
  }

  deleteIssue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
