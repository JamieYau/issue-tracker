import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardViewComponent } from './board-view.component';
import { IssueService } from '../../services/issue.service';
import { of } from 'rxjs';
import { Issue } from '../../models/issue';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BoardIssueCardComponent } from '../board-issue-card/board-issue-card.component';
import { IssueEditFormComponent } from '../issue-edit-form/issue-edit-form.component';
import { IssueCreateFormComponent } from '../issue-create-form/issue-create-form.component';
import { ModalComponent } from '../modal/modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('BoardViewComponent', () => {
  let component: BoardViewComponent;
  let fixture: ComponentFixture<BoardViewComponent>;
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
    {
      issueId: 3,
      title: 'Test Issue 3',
      description: 'Test Description 3',
      status: 'Closed',
      createdDate: new Date(),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BoardViewComponent,
        BoardIssueCardComponent,
        IssueEditFormComponent,
        IssueCreateFormComponent,
        ModalComponent,
        DragDropModule,
      ],
      providers: [
        IssueService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardViewComponent);
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

  it('should get correct count for each status', () => {
    expect(component.getColumnCount('Open')).toBe(1);
    expect(component.getColumnCount('In Progress')).toBe(1);
    expect(component.getColumnCount('Closed')).toBe(1);
  });

  it('should get issues for specific status', () => {
    const openIssues = component.getIssuesForStatus('Open');
    expect(openIssues.length).toBe(1);
    expect(openIssues[0].status).toBe('Open');
  });
});
