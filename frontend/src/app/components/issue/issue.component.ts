import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { signal } from '@angular/core';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class IssueComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly issueService = inject(IssueService);

  issue = signal<Issue | null>(null);
  error = signal<string | null>(null);
  isLoading = signal(true);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.error.set('Invalid issue ID');
      this.isLoading.set(false);
      return;
    }

    this.loadIssue(id);
  }

  private loadIssue(id: number): void {
    this.issueService.getIssue(id).subscribe({
      next: (issue) => {
        this.issue.set(issue);
        this.error.set(null);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set(error.message);
        this.isLoading.set(false);
        console.error('Error loading issue:', error);
      },
    });
  }

  onBack(): void {
    this.router.navigate(['/issues']);
  }
}
