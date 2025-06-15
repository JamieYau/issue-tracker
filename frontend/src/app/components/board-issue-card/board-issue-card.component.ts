import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '../../models/issue';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-board-issue-card',
  templateUrl: './board-issue-card.component.html',
  styleUrls: ['./board-issue-card.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class BoardIssueCardComponent {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  issue = input.required<Issue>();
  edit = output<Issue>();
  delete = output<number>();

  onEditClick(event: MouseEvent): void {
    event.stopPropagation();
    this.edit.emit(this.issue());
  }

  onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.issue().issueId);
  }
}
