import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Issue } from '../../models/issue';

@Component({
  selector: 'app-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class IssueItemComponent {
  issue = input.required<Issue>(); //prop from parent
  isEditing = input<boolean>(false);

  edit = output<Issue>(); // child to parent
  delete = output<number>();

  private readonly router = inject(Router);

  onIssueClick(): void {
    this.router.navigate(['/issues', this.issue().id]);
  }

  onEditClick(event: MouseEvent): void {
    event.stopPropagation();
    this.edit.emit(this.issue());
  }

  onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.issue().id);
  }
}
