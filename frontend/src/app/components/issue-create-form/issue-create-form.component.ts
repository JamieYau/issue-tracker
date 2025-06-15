import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Issue } from '../../models/issue';

@Component({
  selector: 'app-issue-create-form',
  templateUrl: './issue-create-form.component.html',
  styleUrls: ['./issue-create-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class IssueCreateFormComponent {
  newIssue = signal<Issue>({
    issueId: 0,
    title: '',
    description: '',
    status: 'Open',
    createdDate: new Date(),
  });

  create = output<Issue>();
  close = output<void>();

  onCreate(): void {
    this.create.emit(this.newIssue());
    this.close.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.newIssue.set({
      issueId: 0,
      title: '',
      description: '',
      status: 'Open',
      createdDate: new Date(),
    });
  }
}
