import {
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { IssueItemComponent } from '../issue-item/issue-item.component';
import { IssueEditFormComponent } from '../issue-edit-form/issue-edit-form.component';
import { IssueCreateFormComponent } from '../issue-create-form/issue-create-form.component';
import { catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    IssueItemComponent,
    IssueEditFormComponent,
    IssueCreateFormComponent,
    ModalComponent,
  ],
})
export class IssueListComponent implements OnInit {
  @ViewChild('createModal') createModal!: ModalComponent;
  @ViewChild('editModal') editModal!: ModalComponent;

  private readonly issueService = inject(IssueService);
  private readonly destroyRef = inject(DestroyRef); // Inject DestroyRef

  issues = signal<Issue[]>([]);
  editingIssue = signal<Issue | null>(null);

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.issueService
      .getIssues()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          console.error('Error loading issues:', error);
          // error message
          return of([]); // Return empty array to keep app running
        })
      )
      .subscribe((issues) => this.issues.set(issues));
  }

  onIssueCreated(issue: Issue): void {
    this.issueService.createIssue(issue).subscribe({
      next: (createdIssue) => {
        this.issues.update((issues) => [...issues, createdIssue]);
        this.createModal.hide();
      },
      error: (error) => console.error('Error creating issue:', error),
    });
  }

  onEditIssue(issue: Issue): void {
    this.editingIssue.set({ ...issue });
    this.editModal.show();
  }

  onUpdateIssue(updatedIssue: Issue): void {
    this.issueService
      .updateIssue(updatedIssue.issueId, updatedIssue)
      .subscribe({
        next: () => {
          this.issues.update((issues) =>
            issues.map((issue) =>
              issue.issueId === updatedIssue.issueId
                ? { ...updatedIssue, updatedDate: new Date() }
                : issue
            )
          );
          this.editingIssue.set(null);
          this.editModal.hide();
        },
        error: (error) => console.error('Error updating issue:', error),
      });
  }

  onCancelEdit(): void {
    this.editingIssue.set(null);
    this.editModal.hide();
  }

  onDeleteIssue(id: number): void {
    this.issueService.deleteIssue(id).subscribe({
      next: () => {
        this.issues.update((issues) =>
          issues.filter((issue) => issue.issueId !== id)
        );
      },
      error: (error) => console.error('Error deleting issue:', error),
    });
  }
}
