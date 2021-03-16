import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);

    router.initialNavigation();
    component.ngOnInit();
    fixture.detectChanges();
  });

  afterEach(() => {
    router.navigate(['/']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home page after clicking home button', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
