import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueItemComponent } from './issue-item.component';
import { Issue } from '../../models/issue';
import { ComponentRef } from '@angular/core';
import { DatePipe } from '@angular/common';

describe('IssueItemComponent', () => {
  let component: IssueItemComponent;
  let fixture: ComponentFixture<IssueItemComponent>;
  let componentRef: ComponentRef<IssueItemComponent>;
  let datePipe: DatePipe;

  const mockIssue: Issue = {
    issueId: 1,
    title: 'Test Issue',
    description: 'Test Description',
    status: 'Open',
    createdDate: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueItemComponent],
      providers: [DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueItemComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    datePipe = TestBed.inject(DatePipe);

    componentRef.setInput('issue', mockIssue);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event when edit button is clicked', () => {
    spyOn(component.edit, 'emit');
    const editButton = fixture.debugElement.nativeElement.querySelector(
      'button[aria-label="Edit"]'
    );
    editButton.click();
    expect(component.edit.emit).toHaveBeenCalledWith(mockIssue);
  });

  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.delete, 'emit');
    const deleteButton = fixture.debugElement.nativeElement.querySelector(
      'button[aria-label="Delete"]'
    );
    deleteButton.click();
    expect(component.delete.emit).toHaveBeenCalledWith(mockIssue.issueId);
  });

  it('should display issue details correctly', () => {
    const title =
      fixture.debugElement.nativeElement.querySelector('h5').textContent;
    const description =
      fixture.debugElement.nativeElement.querySelector('p').textContent;
    const status =
      fixture.debugElement.nativeElement.querySelector('.status').textContent;
    const createdAt =
      fixture.debugElement.nativeElement.querySelector('.createdAt').textContent;
    const formattedDate = datePipe.transform(
      mockIssue.createdDate,
      'mediumDate'
    );

    expect(title).toContain(mockIssue.title);
    expect(description).toContain(mockIssue.description);
    expect(status).toContain(mockIssue.status);
    expect(createdAt).toContain(formattedDate);
  });
});
