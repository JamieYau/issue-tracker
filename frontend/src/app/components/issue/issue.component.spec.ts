import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueComponent } from './issue.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { of, throwError } from 'rxjs';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('IssueComponent', () => {
  let component: IssueComponent;
  let fixture: ComponentFixture<IssueComponent>;
  let issueService: IssueService;
  let router: Router;

  const mockIssue: Issue = {
    id: 1,
    title: 'Test Issue',
    description: 'Test Description',
    status: 'Open',
    createdDate: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueComponent],
      providers: [
        IssueService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IssueComponent);
    component = fixture.componentInstance;
    issueService = TestBed.inject(IssueService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load issue on init', () => {
    spyOn(issueService, 'getIssue').and.returnValue(of(mockIssue));
    component.ngOnInit();
    expect(issueService.getIssue).toHaveBeenCalledWith(1);
    expect(component.issue()).toEqual(mockIssue);
    expect(component.isLoading()).toBeFalse();
    expect(component.error()).toBeNull();
  });

  it('should handle error when loading issue', () => {
    const errorMessage = 'Test error';
    spyOn(issueService, 'getIssue').and.returnValue(
      throwError(() => new Error(errorMessage))
    );
    component.ngOnInit();
    expect(issueService.getIssue).toHaveBeenCalledWith(1);
    expect(component.issue()).toBeNull();
    expect(component.isLoading()).toBeFalse();
    expect(component.error()).toBe(errorMessage);
  });

  it('should handle invalid issue ID', () => {
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('invalid');
    component.ngOnInit();
    expect(component.issue()).toBeNull();
    expect(component.isLoading()).toBeFalse();
    expect(component.error()).toBe('Invalid issue ID');
  });

  it('should navigate back to issues list', () => {
    spyOn(router, 'navigate');
    component.onBack();
    expect(router.navigate).toHaveBeenCalledWith(['/issues']);
  });
});
