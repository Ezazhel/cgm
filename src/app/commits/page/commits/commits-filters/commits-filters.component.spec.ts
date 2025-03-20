import { provideLocationMocks } from '@angular/common/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { CommitsFilterComponent } from './commits-filters.component';
import { By } from '@angular/platform-browser';

describe('commits filters', () => {
  it('should refresh url with q queryParams', fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommitsFilterComponent],
      providers: [provideRouter([]), provideLocationMocks()],
    });
    const fixture = TestBed.createComponent(CommitsFilterComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    spyOn(component, 'filter').and.callThrough();
    const inputSearch = fixture.debugElement.query(
      By.css('[data-testId=searchParams]'),
    );
    expect(inputSearch).toBeDefined();
    inputSearch.nativeElement.value = 'content';
    (inputSearch.nativeElement as HTMLInputElement).dispatchEvent(
      new Event('search'),
    );
    tick();
    expect(component.filter).toHaveBeenCalled();
    expect(TestBed.inject(Router).url).toEqual('/?q=content');
  }));
});
