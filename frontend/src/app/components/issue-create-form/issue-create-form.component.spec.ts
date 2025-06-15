import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueCreateFormComponent } from './issue-create-form.component';
import { FormsModule } from '@angular/forms';

describe('IssueCreateFormComponent', () => {
  let component: IssueCreateFormComponent;
  let fixture: ComponentFixture<IssueCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueCreateFormComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit create event with new issue when form is submitted', () => {
    spyOn(component.create, 'emit');
    const newIssue = {
      title: 'New Issue',
      description: 'New Description',
      status: 'Open',
    };

    const titleInput =
      fixture.debugElement.nativeElement.querySelector('#create-title');
    const descriptionInput = fixture.debugElement.nativeElement.querySelector(
      '#create-description'
    );
    const statusSelect =
      fixture.debugElement.nativeElement.querySelector('#create-status');

    titleInput.value = newIssue.title;
    titleInput.dispatchEvent(new Event('input'));
    descriptionInput.value = newIssue.description;
    descriptionInput.dispatchEvent(new Event('input'));
    statusSelect.value = newIssue.status;
    statusSelect.dispatchEvent(new Event('change'));

    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.create.emit).toHaveBeenCalledWith({
      issueId: 0,
      title: newIssue.title,
      description: newIssue.description,
      status: newIssue.status,
      createdDate: jasmine.any(Date),
    });
  });

  it('should reset form after submission', () => {
    const titleInput =
      fixture.debugElement.nativeElement.querySelector('#create-title');
    titleInput.value = 'Test Title';
    titleInput.dispatchEvent(new Event('input'));

    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.newIssue().title).toBe('');
    expect(component.newIssue().description).toBe('');
  });
});
