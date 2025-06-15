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
import { BoardIssueCardComponent } from '../board-issue-card/board-issue-card.component';
import { IssueEditFormComponent } from '../issue-edit-form/issue-edit-form.component';
import { IssueCreateFormComponent } from '../issue-create-form/issue-create-form.component';
import { catchError, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalComponent } from '../modal/modal.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

export type IssueStatus = 'Open' | 'In Progress' | 'Closed';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    BoardIssueCardComponent,
    IssueEditFormComponent,
    IssueCreateFormComponent,
    ModalComponent,
    DragDropModule,
  ],
})
export class BoardViewComponent implements OnInit {
  @ViewChild('createModal') createModal!: ModalComponent;
  @ViewChild('editModal') editModal!: ModalComponent;

  private readonly issueService = inject(IssueService);
  private readonly destroyRef = inject(DestroyRef);

  issues = signal<Issue[]>([]);
  editingIssue = signal<Issue | null>(null);

  columns = [
    {
      status: 'Open' as IssueStatus,
      title: 'Open',
      headerClass: 'bg-primary bg-opacity-10',
    },
    {
      status: 'In Progress' as IssueStatus,
      title: 'In Progress',
      headerClass: 'bg-warning bg-opacity-10',
    },
    {
      status: 'Closed' as IssueStatus,
      title: 'Closed',
      headerClass: 'bg-success bg-opacity-10',
    },
  ];

  getIssuesForStatus(status: IssueStatus): Issue[] {
    return this.issues().filter((issue) => issue.status === status);
  }

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
          return of([]);
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

  onDrop(event: CdkDragDrop<Issue[]>, targetStatus: IssueStatus): void {
    const issue = event.item.data as Issue;

    if (event.previousContainer === event.container) {
      // Same column - just reorder
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Different column - move and update status
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the issue status
      const updatedIssue = { ...issue, status: targetStatus };
      this.issueService.updateIssue(issue.issueId, updatedIssue).subscribe({
        next: () => {
          this.issues.update((issues) =>
            issues.map((i) =>
              i.issueId === issue.issueId
                ? { ...updatedIssue, updatedDate: new Date() }
                : i
            )
          );
        },
        error: (error) => {
          console.error('Error updating issue status:', error);
          // Revert the UI change on error
          this.loadIssues();
        },
      });
    }
  }

  getColumnCount(status: IssueStatus): number {
    switch (status) {
      case 'Open':
        return this.getIssuesForStatus('Open').length;
      case 'In Progress':
        return this.getIssuesForStatus('In Progress').length;
      case 'Closed':
        return this.getIssuesForStatus('Closed').length;
      default:
        return 0;
    }
  }
}
