import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
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
}
