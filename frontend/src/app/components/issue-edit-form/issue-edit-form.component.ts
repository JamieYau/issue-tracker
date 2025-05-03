import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Issue } from '../../models/issue';

@Component({
  selector: 'app-issue-edit-form',
  templateUrl: './issue-edit-form.component.html',
  styleUrls: ['./issue-edit-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class IssueEditFormComponent {
  issue = input.required<Issue>();

  save = output<Issue>();
  cancel = output<void>();

  onSave(): void {
    this.save.emit(this.issue());
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
