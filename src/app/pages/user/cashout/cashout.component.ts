import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BlockchainService } from 'src/app/core/api/blockchain/blockchain.service';
import { CashoutService } from 'src/app/core/api/cashout/cashout.service';
import { MembershipService } from '../../../core/api/membership/membership.service';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['./cashout.component.scss'],
})
export class CashoutComponent implements OnInit {
  public userMembershipDetails: any;
  public notYetPaidMessage: any[] = [];
  public membershipForm: FormGroup;
  public membershipProcessing: boolean = false;
  public cashoutForm: FormGroup;
  public cashoutProcessing: boolean = false;
  public btcValue: string = '0';
  public adminBtcWallet: string = '1GM7YzQCPTdTmPUizB7zkCAn5Yr12L4di7';
  public loadingData: boolean = true;
  public cashoutStatus: any;

  constructor(
    private membershipService: MembershipService,
    private fb: FormBuilder,
    private blockchainService: BlockchainService,
    private messageService: MessageService,
    private cashoutService: CashoutService
  ) {}

  ngOnInit(): void {
    this.getUserMembershipDetails();

    this.membershipForm = this.fb.group({
      transactionHash: ['', Validators.required],
    });

    this.getBtcValueFromUsd();
    this.checkCashout();
  }

  getUserMembershipDetails() {
    this.loadingData = true;
    const userDetails = this.getSavedUserDetails();

    this.membershipService.getDetails(userDetails.id).subscribe((resp) => {
      const { membership } = resp.data;
      console.log(membership);
      this.userMembershipDetails = membership;
      this.loadingData = false;

      this.cashoutForm = this.fb.group({
        unilevel: [
          '',
          Validators.compose([
            Validators.required,
            Validators.min(0),
            Validators.max(parseFloat(membership.unilevel_points)),
          ]),
        ],
        interest: [
          '',
          Validators.compose([
            Validators.required,
            Validators.min(0),
            Validators.max(parseFloat(membership.interest)),
          ]),
        ],
      });

      console.log(this.cashoutForm);
    });
  }

  getSavedUserDetails() {
    return JSON.parse(localStorage.getItem('userDetails'));
  }

  isUserAlreadyPaid(): boolean {
    return this.userMembershipDetails &&
      this.userMembershipDetails.is_paid == 1 &&
      this.userMembershipDetails.paid_status == 'confirmed'
      ? true
      : false;
  }

  isUserAlreadyHasPaid(): boolean {
    return this.userMembershipDetails &&
      this.userMembershipDetails.paid_status == 'pending'
      ? true
      : false;
  }

  private getBtcValueFromUsd() {
    this.blockchainService.getBtcValueFromUsd('30').subscribe((resp) => {
      const data = resp.data;

      this.btcValue = data.btc_value;
    });
  }

  submitCashout() {
    if (!this.cashoutForm.valid) {
      this.cashoutForm.markAllAsTouched();
      return;
    }

    this.cashoutProcessing = true;

    const unilevel: string = this.cashoutForm.controls['unilevel'].value;
    const interest: string = this.cashoutForm.controls['interest'].value;

    this.cashoutService
      .submit(
        this.userMembershipDetails.id,
        this.userMembershipDetails.user.id,
        parseFloat(unilevel),
        parseFloat(interest)
      )
      .subscribe((resp) => {
        console.log(resp);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Payment Submitted Successfuly',
        });

        this.cashoutProcessing = false;
      });
  }

  payMembership() {
    if (!this.membershipForm.valid) {
      this.membershipForm.markAllAsTouched();
      return;
    }

    this.cashoutProcessing = true;

    const transactionHash: string = this.membershipForm.controls[
      'transactionHash'
    ].value;

    this.membershipService
      .pay(this.userMembershipDetails.id, this.btcValue, transactionHash)
      .subscribe((resp) => {
        console.log(resp);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Payment Submitted Successfuly',
        });

        this.getUserMembershipDetails();

        this.cashoutProcessing = false;
      });
  }

  checkCashout() {
    this.isCashoutDay();
    const userDetails = this.getSavedUserDetails();

    this.cashoutService.isAlreadyCashout(userDetails.id).subscribe((resp) => {
      console.log('isAlreadyCashout', resp);

      this.cashoutStatus = Object.assign({}, resp.data.cashout, {
        isToday: resp.data.isToday,
      });

      console.log('cashoutStatus', this.cashoutStatus);
    });
  }

  isCashoutDay() {
    const todayDate = new Date().getDate();

    // console.log('todayDate', todayDate);

    // return todayDate === 1;
    return true;
  }
}
