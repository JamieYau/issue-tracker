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
    id: 0,
    title: '',
    description: '',
    status: 'Open',
    createdDate: new Date(),
  });

  create = output<Issue>();

  onCreate(): void {
    this.create.emit(this.newIssue());
    this.resetForm();
  }

  private resetForm(): void {
    this.newIssue.set({
      id: 0,
      title: '',
      description: '',
      status: 'Open',
      createdDate: new Date(),
    });
  }
}
