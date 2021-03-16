import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { routes } from '../../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../_core/auth/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);
    router.initialNavigation();

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalid form if all fields are empty', () => {
    component.register();

    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should validates email', () => {
    let email = component.registerForm.controls['email'];

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
    let password = component.registerForm.controls['password'];

    let errors = {};

    errors = password.errors;

    expect(errors['required']).toBeTruthy();

    password.setValue('qwer');

    errors = password.errors;

    expect(errors['minlength']).toBeTruthy();

    password.setValue('qwerty');
    expect(password.valid).toBeTruthy();
  });

  it('should validates confirm password', () => {
    let password = component.registerForm.controls['password'];
    let confirmPassword = component.registerForm.controls['confirmPassword'];

    let errors = {};

    errors = confirmPassword.errors;

    expect(errors['required']).toBeTruthy();

    confirmPassword.setValue('qwer');
    password.setValue('qwert');

    errors = confirmPassword.errors;

    expect(errors['isMatch']).toBeTruthy();

    password.setValue('qwerty');
    confirmPassword.setValue('qwerty');

    expect(confirmPassword.valid).toBeTruthy();
  });

  it('should validates confirm password', () => {
    let name = component.registerForm.controls['name'];

    let errors = {};

    errors = name.errors;

    expect(errors['required']).toBeTruthy();

    name.setValue('test');

    expect(name.valid).toBeTruthy();
  });

  it('should redirect to login page if go to login is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.goToLogin();

    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
  });
});
