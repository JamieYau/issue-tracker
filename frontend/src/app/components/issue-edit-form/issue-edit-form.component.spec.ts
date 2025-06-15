import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueEditFormComponent } from './issue-edit-form.component';
import { Issue } from '../../models/issue';
import { ComponentRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('IssueEditFormComponent', () => {
  let component: IssueEditFormComponent;
  let fixture: ComponentFixture<IssueEditFormComponent>;
  let componentRef: ComponentRef<IssueEditFormComponent>;

  const mockIssue: Issue = {
    issueId: 1,
    title: 'Test Issue',
    description: 'Test Description',
    status: 'Open',
    createdDate: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueEditFormComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueEditFormComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('issue', mockIssue);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display issue values in form', () => {
    const titleInput =
      fixture.debugElement.nativeElement.querySelector('#edit-title');
    const descriptionInput =
      fixture.debugElement.nativeElement.querySelector('#edit-description');
    const statusSelect =
      fixture.debugElement.nativeElement.querySelector('#edit-status');

    expect(titleInput.value).toBe(mockIssue.title);
    expect(descriptionInput.value).toBe(mockIssue.description);
    expect(statusSelect.value).toBe(mockIssue.status);
  });

  it('should emit save event with issue when save button is clicked', () => {
    spyOn(component.save, 'emit');
    const saveButton = fixture.debugElement.nativeElement.querySelector(
      'button[type="submit"]'
    );
    saveButton.click();
    expect(component.save.emit).toHaveBeenCalledWith(mockIssue);
  });
});
