import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/core/api/user/user.service';
import { ConfirmPasswordMatchValidatorDirective } from 'src/app/core/utils/confirm-password-match-validator.util';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  public accountDetailsForm: FormGroup;
  public accountPasswordForm: FormGroup;
  public updateAccountDetailsProcessing: boolean = false;
  public updateAccountPasswordProcessing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private confirmPasswordMatchValidator: ConfirmPasswordMatchValidatorDirective,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.accountDetailsForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      btcWallet: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
    });

    this.accountPasswordForm = this.fb.group(
      {
        oldPassword: [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
        newPassword: [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
        confirmNewPassword: [
          '',
          Validators.compose([Validators.required, Validators.minLength(5)]),
        ],
      },
      {
        validators: this.confirmPasswordMatchValidator.validate(
          'newPassword',
          'confirmNewPassword'
        ),
      }
    );

    this.getUserCredentials();
  }

  getUserCredentials() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    this.userService.getOne(userDetails.id).subscribe((resp) => {
      const { data } = resp;

      this.accountDetailsForm.controls['username'].setValue(data.user.email);
      this.accountDetailsForm.controls['btcWallet'].setValue(
        data.user.btc_wallet
      );
      this.accountDetailsForm.controls['name'].setValue(data.user.name);
    });
  }

  updateAccountDetails() {
    if (!this.accountDetailsForm.valid) {
      this.accountDetailsForm.markAllAsTouched();
      return;
    }

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const name: string = this.accountDetailsForm.controls['name'].value;
    const email: string = this.accountDetailsForm.controls['username'].value;
    const btcWallet: string = this.accountDetailsForm.controls['btcWallet']
      .value;

    this.userService
      .updateAccountDetails(userDetails.id, name, email, btcWallet)
      .subscribe(
        (resp) => {
          console.log(resp);
          const { user } = resp.data;

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Updated Successfuly',
          });

          this.updateSavedUserDetails(user);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateAccountPassword() {
    if (!this.accountPasswordForm.valid) {
      this.accountPasswordForm.markAllAsTouched();
      return;
    }

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const oldPassword: string = this.accountPasswordForm.controls['oldPassword']
      .value;
    const newPassword: string = this.accountPasswordForm.controls['newPassword']
      .value;

    this.userService
      .updateAccountPassword(userDetails.id, oldPassword, newPassword)
      .subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log(err);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.error,
          });
        }
      );
  }

  private updateSavedUserDetails(userDetails: any) {
    localStorage.setItem(
      'userDetails',
      JSON.stringify({
        email: userDetails.email,
        id: userDetails.id,
        name: userDetails.email,
        btc_wallet: userDetails.btc_wallet,
      })
    );
  }
}
