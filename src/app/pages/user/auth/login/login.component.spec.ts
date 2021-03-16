import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routes } from '../../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../_core/auth/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
      ],
      providers: [AuthService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);
    router.initialNavigation();

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalid form on first load', () => {
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should invalid form after login without email and password', () => {
    component.login();

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validates email', () => {
    let email = component.loginForm.controls['email'];

    expect(email.valid).toBeFalsy();

    let errors = {};
    errors = email.errors;
    expect(errors['required']).toBeTruthy();

    email.setValue('test');

    errors = email.errors;
    expect(errors['email']).toBeTruthy();

    email.setValue('test@gmail.com');
    expect(email.valid).toBeTruthy();
  });

  it('should validates password', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    let errors = {};
    errors = password.errors;

    expect(errors['required']).toBeTruthy();

    password.setValue('qwer');

    errors = password.errors;
    expect(errors['minlength']).toBeTruthy();

    password.setValue('qwerty');
    expect(password.valid).toBeTruthy();
  });

  it('should valid form after login', () => {
    let email = component.loginForm.controls['email'];
    let password = component.loginForm.controls['password'];

    email.setValue('test@gmail.com');
    password.setValue('qwerty');

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should redirect to register page after clicking go to register button', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToRegister();
    expect(navigateSpy).toHaveBeenCalledWith(['/auth/register']);
  });
});
