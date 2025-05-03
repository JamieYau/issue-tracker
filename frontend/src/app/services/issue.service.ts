import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private apiUrl = 'https://localhost:7211/api/issues';
  private http = inject(HttpClient);

  getIssues(): Observable<Issue[]> {
    return this.http
      .get<Issue[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getIssue(id: number): Observable<Issue> {
    return this.http
      .get<Issue>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createIssue(issue: Issue): Observable<Issue> {
    return this.http
      .post<Issue>(this.apiUrl, issue)
      .pipe(catchError(this.handleError));
  }

  updateIssue(id: number, issue: Issue): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/${id}`, issue)
      .pipe(catchError(this.handleError));
  }

  deleteIssue(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.status === 0) {
      errorMessage =
        'A network error occurred. Please check your connection and try again.';
    } else if (error.status === 404) {
      errorMessage = 'The requested resource was not found.';
    } else if (error.status === 400) {
      errorMessage = 'Invalid request. Please check your input.';
    } else if (error.status === 500) {
      errorMessage = 'A server error occurred. Please try again later.';
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }

    // Log the error for debugging
    console.error('Error details:', error);

    // Return an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }
}
