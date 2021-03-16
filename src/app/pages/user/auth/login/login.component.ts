import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/api/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSubscription: Subscription;
  public loginForm: FormGroup;
  public loginProcessing: boolean = false;
  public loginStatusMessage: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) this.loginSubscription.unsubscribe();
  }

  login(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginProcessing = true;
    this.clearErrorMessages();

    const username: string = this.loginForm.controls['username'].value;
    const password: string = this.loginForm.controls['password'].value;

    this.loginSubscription = this.authService
      .login({
        email: username,
        password: password,
      })
      .subscribe(
        (resp: any) => {
          const data = resp.data;

          if (resp.success == true) {
            this.authService.storeAccessToken(data.accessToken);
            this.authService.storeUserDetails(data.user);
          }

          setTimeout(() => {
            this.loginProcessing = false;
            this.router.navigate(['/user/dashboard']);
          }, 200);
        },
        (err: any) => {
          console.log(err);
          this.loginProcessing = false;

          if (err.status === 403) {
            this.loginStatusMessage = [
              {
                severity: 'error',
                detail: 'The username and password did not matched',
              },
            ];
          } else {
            this.loginStatusMessage = [
              {
                severity: 'error',
                detail: 'Something went wrong',
              },
            ];
          }
        }
      );
  }

  goToRegister(): void {
    this.router.navigate(['/user/auth/register']);
  }

  private clearErrorMessages(): void {
    this.loginStatusMessage = [];
  }
}
