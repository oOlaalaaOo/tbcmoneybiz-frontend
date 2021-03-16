import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from '../app-routing.module';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
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

  it('should redirect to login page after clicking login button', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToLogin();
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should redirect to register page after clicking register button', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToRegister();
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/register']);
  });
});
