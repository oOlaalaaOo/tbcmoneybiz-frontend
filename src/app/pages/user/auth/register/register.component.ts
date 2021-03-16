import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/api/auth/auth.service';
import { Subscription } from 'rxjs';
import { BlockchainService } from 'src/app/core/api/blockchain/blockchain.service';
import { ConfirmPasswordMatchValidatorDirective } from '../../../../core/utils/confirm-password-match-validator.util';
import { MessageService } from 'primeng/api';

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
  public adminBtcWallet: string = '3M38QEqP3uFC4GiPGXZWLKPXyczw8octpU';
  public btcValue: string = '0';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private confirmPasswordMatchValidator: ConfirmPasswordMatchValidatorDirective,
    private blockchainService: BlockchainService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let referrerCode = '';

    this.route.queryParams.subscribe((params) => {
      referrerCode = params['code'];
    });

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
        name: [''],
        referrerCode: [referrerCode, Validators.required],
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
          this.registerForm.reset();

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registered Successfuly',
          });

          setTimeout(() => {
            this.registerProcessing = false;
            this.goToLogin();
          }, 1000);
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
    this.router.navigate(['/user/auth/login']);
  }

  private clearErrorMessages(): void {
    this.registerStatusMessage = [];
  }

  private getBtcValueFromUsd() {
    this.blockchainService.getBtcValueFromUsd('12').subscribe((resp) => {
      const data = resp.data;

      console.log('data', data);
      this.btcValue = data.btc_value;
    });
  }
}
