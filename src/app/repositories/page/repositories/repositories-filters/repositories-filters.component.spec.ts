import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RepositoriesFiltersComponent } from './repositories-filters.component';
import { provideRouter, Router } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { RouterTestingHarness } from '@angular/router/testing';

describe('Repositories Filter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'filters', component: RepositoriesFiltersComponent },
        ]),
        provideLocationMocks(),
      ],
    });
  });
  it('should refresh url with defined formValue', fakeAsync(() => {
    const fixture = TestBed.createComponent(RepositoriesFiltersComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    component.filterRepository();
    expect(component).toBeDefined();
    expect(router.url).toEqual('/');
    component.repositoriesFilterGroup.patchValue({
      name: 'name',
    });
    component.filterRepository();
    tick();
    expect(router.url).toEqual('/?name=name');
    component.repositoriesFilterGroup.patchValue({
      language: 'language',
    });
    component.filterRepository();
    tick();
    expect(router.url).toEqual('/?name=name&language=language');
    component.issuesFilterGroup.patchValue({
      issueTitle: 'issue',
    });
    component.filterIssues();
    tick();
    expect(router.url).toEqual('/?issueTitle=issue');
  }));

  it('should set form with value from url', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl(
      'filters?name=name&language=javascript&issueTitle=title&stars=5',
      RepositoriesFiltersComponent,
    );
    expect(component.repositoriesFilterGroup.value).toEqual({
      name: 'name',
      language: 'javascript',
      stars: '5', //params passed by query are converted to string in patchValue if we want to keep typeof we should implement a logic
    });
    expect(component.issuesFilterGroup.value).toEqual({
      issueTitle: 'title',
    });
  });
});
