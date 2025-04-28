import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  newIssue: Issue = {
    id: 0,
    title: '',
    description: '',
    status: 'Open',
    createdDate: new Date(),
  };

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.issueService.getIssues().subscribe({
      next: (issues) => (this.issues = issues),
      error: (error) => console.error('Error loading issues:', error),
    });
  }

  createIssue(): void {
    this.issueService.createIssue(this.newIssue).subscribe({
      next: (issue) => {
        this.issues.push(issue);
        this.newIssue = {
          id: 0,
          title: '',
          description: '',
          status: 'Open',
          createdDate: new Date(),
        };
      },
      error: (error) => console.error('Error creating issue:', error),
    });
  }

  deleteIssue(id: number): void {
    this.issueService.deleteIssue(id).subscribe({
      next: () => {
        this.issues = this.issues.filter((issue) => issue.id !== id);
      },
      error: (error) => console.error('Error deleting issue:', error),
    });
  }
}
