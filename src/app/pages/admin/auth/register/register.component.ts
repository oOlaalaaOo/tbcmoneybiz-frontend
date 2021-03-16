import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/api/auth/auth.service';
import { Subscription } from 'rxjs';
import { BlockchainService } from 'src/app/core/api/blockchain/blockchain.service';
import { ConfirmPasswordMatchValidatorDirective } from '../../../../core/utils/confirm-password-match-validator.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private registerSubscription: Subscription;
  public registerForm: FormGroup;
  public registerStatusMessage: any[] = [];
  public registerProcessing: boolean = false;
  public adminBtcWallet: string = '1GM7YzQCPTdTmPUizB7zkCAn5Yr12L4di7';
  public btcValue: string = '0';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private confirmPasswordMatchValidator: ConfirmPasswordMatchValidatorDirective,
    private blockchainService: BlockchainService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
        confirmPassword: ['', Validators.required],
        name: ['', Validators.required],
        referrerCode: ['', Validators.required],
        transactionHash: ['', Validators.required],
      },
      {
        validators: this.confirmPasswordMatchValidator.validate(
          'password',
          'confirmPassword'
        ),
      }
    );

    this.getBtcValueFromUsd();
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) this.registerSubscription.unsubscribe();
  }

  register(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.registerProcessing = true;
    this.clearErrorMessages();

    const username: string = this.registerForm.controls['username'].value;
    const password: string = this.registerForm.controls['password'].value;
    const name: string = this.registerForm.controls['name'].value;
    const referrerCode: string = this.registerForm.controls['referrerCode']
      .value;
    const transactionHash: string = this.registerForm.controls[
      'transactionHash'
    ].value;

    this.registerSubscription = this.authService
      .register({
        email: username,
        password: password,
        name: name,
        referrerCode: referrerCode,
        transactionHash: transactionHash,
        adminBtcWallet: this.adminBtcWallet,
        btcValue: this.btcValue,
      })
      .subscribe(
        (resp: any) => {
          console.log(resp);
          this.registerProcessing = false;
          this.registerForm.reset();
        },
        (err: any) => {
          console.log(err);

          if (err.status === 422) {
            this.registerStatusMessage.push({
              severity: 'error',
              detail: 'The username has already been taken',
            });
          } else {
            this.registerStatusMessage.push({
              severity: 'error',
              detail: 'Something went wrong',
            });
          }

          this.registerProcessing = false;
        }
      );
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  private clearErrorMessages(): void {
    this.registerStatusMessage = [];
  }

  private getBtcValueFromUsd() {
    this.blockchainService.getBtcValueFromUsd('50').subscribe((resp) => {
      console.log(resp);
      const data = resp.data;

      this.btcValue = data.btc_value;
    });
  }
}
