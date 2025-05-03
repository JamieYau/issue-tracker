import { Routes } from '@angular/router';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { IssueComponent } from './components/issue/issue.component';
import { BoardViewComponent } from './components/board-view/board-view.component';

export const routes: Routes = [
  { path: '', component: IssueListComponent, pathMatch: 'full' },
  { path: 'issues', component: IssueListComponent },
  { path: 'issues/:id', component: IssueComponent },
  { path: 'board', component: BoardViewComponent },
  { path: '**', redirectTo: '' }, // Catch-all route for non-matching routes
];
