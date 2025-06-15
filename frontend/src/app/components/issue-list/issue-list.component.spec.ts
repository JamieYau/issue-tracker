import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueListComponent } from './issue-list.component';
import { IssueService } from '../../services/issue.service';
import { of } from 'rxjs';
import { Issue } from '../../models/issue';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IssueItemComponent } from '../issue-item/issue-item.component';
import { IssueEditFormComponent } from '../issue-edit-form/issue-edit-form.component';
import { IssueCreateFormComponent } from '../issue-create-form/issue-create-form.component';
import { ModalComponent } from '../modal/modal.component';

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;
  let issueService: IssueService;

  const mockIssues: Issue[] = [
    {
      issueId: 1,
      title: 'Test Issue 1',
      description: 'Test Description 1',
      status: 'Open',
      createdDate: new Date(),
    },
    {
      issueId: 2,
      title: 'Test Issue 2',
      description: 'Test Description 2',
      status: 'In Progress',
      createdDate: new Date(),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IssueListComponent,
        IssueItemComponent,
        IssueEditFormComponent,
        IssueCreateFormComponent,
        ModalComponent,
      ],
      providers: [
        IssueService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    issueService = TestBed.inject(IssueService);

    // Initialize component state
    component.issues.set(mockIssues);
    component.editingIssue.set(null);

    // Setup spies for service methods
    spyOn(issueService, 'getIssues').and.returnValue(of(mockIssues));
    spyOn(issueService, 'createIssue').and.returnValue(of(mockIssues[0]));
    spyOn(issueService, 'updateIssue').and.returnValue(of(void 0));
    spyOn(issueService, 'deleteIssue').and.returnValue(of(void 0));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load issues on init', () => {
    component.ngOnInit();
    expect(issueService.getIssues).toHaveBeenCalled();
  });

  it('should show edit modal when edit event is received', () => {
    const issueToEdit = mockIssues[0];
    const editModal = { show: jasmine.createSpy('show') };
    component.editModal = editModal as any;

    component.onEditIssue(issueToEdit);
    expect(editModal.show).toHaveBeenCalled();
  });

  it('should hide create modal after issue creation', () => {
    const newIssue: Issue = {
      issueId: 0,
      title: 'New Issue',
      description: 'New Description',
      status: 'Open',
      createdDate: new Date(),
    };
    const createModal = { hide: jasmine.createSpy('hide') };
    component.createModal = createModal as any;

    component.onIssueCreated(newIssue);
    expect(createModal.hide).toHaveBeenCalled();
  });

  it('should hide edit modal after issue update', () => {
    const updatedIssue = { ...mockIssues[0], title: 'Updated Title' };
    const editModal = { hide: jasmine.createSpy('hide') };
    component.editModal = editModal as any;

    component.onUpdateIssue(updatedIssue);
    expect(editModal.hide).toHaveBeenCalled();
  });
});
