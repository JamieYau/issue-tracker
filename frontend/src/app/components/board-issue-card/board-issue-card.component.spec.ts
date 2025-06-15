import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardIssueCardComponent } from './board-issue-card.component';
import { Issue } from '../../models/issue';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentRef } from '@angular/core';

describe('BoardIssueCardComponent', () => {
  let component: BoardIssueCardComponent;
  let fixture: ComponentFixture<BoardIssueCardComponent>;
  let componentRef: ComponentRef<BoardIssueCardComponent>;

  const mockIssue: Issue = {
    issueId: 1,
    title: 'Test Issue',
    description: 'Test Description',
    status: 'Open',
    createdDate: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardIssueCardComponent, FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardIssueCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('issue', mockIssue);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display issue title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h6')?.textContent).toContain(
      mockIssue.title
    );
  });

  it('should display issue description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-text')?.textContent).toContain(
      mockIssue.description
    );
  });

  it('should display issue status', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.badge')?.textContent).toContain(
      mockIssue.status
    );
  });

  it('should emit edit event when edit button is clicked', () => {
    const editSpy = spyOn(component.edit, 'emit');
    const editButton = fixture.nativeElement.querySelector(
      'button[aria-label="Edit"]'
    );

    editButton.click();
    expect(editSpy).toHaveBeenCalledWith(mockIssue);
  });

  it('should emit delete event when delete button is clicked', () => {
    const deleteSpy = spyOn(component.delete, 'emit');
    const deleteButton = fixture.nativeElement.querySelector(
      'button[aria-label="Delete"]'
    );

    deleteButton.click();
    expect(deleteSpy).toHaveBeenCalledWith(mockIssue.issueId);
  });

  it('should apply correct status badge class', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.badge');

    expect(badge?.classList).toContain('bg-info');

    // Test other statuses
    componentRef.setInput('issue', { ...mockIssue, status: 'In Progress' });
    fixture.detectChanges();
    expect(badge?.classList).toContain('bg-warning');

    componentRef.setInput('issue', { ...mockIssue, status: 'Closed' });
    fixture.detectChanges();
    expect(badge?.classList).toContain('bg-success');
  });
});
