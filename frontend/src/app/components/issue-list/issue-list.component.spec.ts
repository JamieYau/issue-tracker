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

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;
  let issueService: IssueService;

  const mockIssues: Issue[] = [
    {
      id: 1,
      title: 'Test Issue 1',
      description: 'Test Description 1',
      status: 'Open',
      createdDate: new Date(),
    },
    {
      id: 2,
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load issues on init', () => {
    spyOn(issueService, 'getIssues').and.returnValue(of(mockIssues));
    component.ngOnInit();
    expect(issueService.getIssues).toHaveBeenCalled();
    expect(component.issues()).toEqual(mockIssues);
  });

  it('should handle issue creation', () => {
    const newIssue: Issue = {
      id: 0,
      title: 'New Issue',
      description: 'New Description',
      status: 'Open',
      createdDate: new Date(),
    };
    spyOn(issueService, 'createIssue').and.returnValue(of(newIssue));
    component.onIssueCreated(newIssue);
    expect(issueService.createIssue).toHaveBeenCalledWith(newIssue);
    expect(component.issues()).toContain(newIssue);
  });

  it('should handle issue editing', () => {
    const issueToEdit = mockIssues[0];
    component.onEditIssue(issueToEdit);
    expect(component.editingIssue()).toEqual(issueToEdit);
  });

  it('should handle issue update', () => {
    const updatedIssue = { ...mockIssues[0], title: 'Updated Title' };
    spyOn(issueService, 'updateIssue').and.returnValue(of(void 0));
    component.issues.set([...mockIssues]);
    component.onUpdateIssue(updatedIssue);
    expect(issueService.updateIssue).toHaveBeenCalledWith(
      updatedIssue.id,
      updatedIssue
    );
    expect(
      component.issues().find((i) => i.id === updatedIssue.id)?.title
    ).toBe('Updated Title');
  });

  it('should handle issue deletion', () => {
    spyOn(issueService, 'deleteIssue').and.returnValue(of(void 0));
    component.issues.set([...mockIssues]);
    component.onDeleteIssue(1);
    expect(issueService.deleteIssue).toHaveBeenCalledWith(1);
    expect(component.issues().length).toBe(1);
    expect(component.issues().find((i) => i.id === 1)).toBeUndefined();
  });
});
