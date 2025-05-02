import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueListComponent } from './issue-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IssueService } from '../../services/issue.service';
import { of } from 'rxjs';
import { Issue } from '../../models/issue';

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
      imports: [IssueListComponent],
      providers: [
        IssueService,
        provideHttpClient(),
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
    expect(component.issues).toEqual(mockIssues);
  });

  it('should create a new issue', () => {
    const newIssue: Issue = {
      id: 0,
      title: 'New Issue',
      description: 'New Description',
      status: 'Open',
      createdDate: new Date(),
    };
    spyOn(issueService, 'createIssue').and.returnValue(of(newIssue));
    component.newIssue = newIssue;
    component.createIssue();
    expect(issueService.createIssue).toHaveBeenCalledWith(newIssue);
    expect(component.issues).toContain(newIssue);
  });

  it('should delete an issue', () => {
    component.issues = [...mockIssues];
    spyOn(issueService, 'deleteIssue').and.returnValue(of(void 0));
    component.deleteIssue(1);
    expect(issueService.deleteIssue).toHaveBeenCalledWith(1);
    expect(component.issues.length).toBe(1);
    expect(component.issues.find((issue) => issue.id === 1)).toBeUndefined();
  });
});
