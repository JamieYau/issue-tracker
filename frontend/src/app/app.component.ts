import { Component } from '@angular/core';
import { IssueListComponent } from './components/issue-list/issue-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [IssueListComponent],
})
export class AppComponent {
  title = 'issue-tracker';
}
