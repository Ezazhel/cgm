import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RepositoryComponent } from './repository.component';
import { Repository } from '../../../model/repository.model';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

describe('Repository Component', () => {
  let fixture: ComponentFixture<RepositoryComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'commits', component: RepositoryComponent }]),
        provideLocationMocks(),
      ],
    });
    fixture = TestBed.createComponent(RepositoryComponent);
  });
  it('should not display language when language is not provied', () => {
    fixture.componentRef.setInput('repository', {
      name: 'Name',
      created_at: Date.now().toString(),
      owner: { login: 'login' },
    } as Repository);
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('[data-testid=language-badge]')),
    ).toBeNull();
  });
  it('should display language when language is provided', () => {
    fixture.componentRef.setInput('repository', {
      name: 'Name',
      created_at: Date.now().toString(),
      language: 'javascript',
      owner: { login: 'login' },
    } as Repository);
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('[data-testid=language-badge]')),
    ).toBeDefined();
  });

  it('should redirect to commits on repository click', fakeAsync(() => {
    fixture.componentRef.setInput('repository', {
      name: 'Name',
      created_at: Date.now().toString(),
      owner: { login: 'login' },
    } as Repository);
    fixture.detectChanges();
    const link = fixture.debugElement.query(
      By.css('[data-testid=repository-link]'),
    );
    link.nativeElement.click();
    tick();
    const router = TestBed.inject(Router);
    expect(decodeURIComponent(router.url)).toEqual('/commits?repo=login/Name');
  }));
});
