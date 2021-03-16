import { Component, OnInit } from '@angular/core';
import { MembershipService } from 'src/app/core/api/membership/membership.service';
import { SelectItem } from 'primeng/api';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public downlines: Array<any> = [];
  public loadingDownlines: boolean = true;
  public levels: SelectItem[] = [];
  public selectedLevel: number = 1;
  public userMembershipDetails: any;

  constructor(
    private membershipService: MembershipService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDownlines();
    this.getUserMembershipDetails();

    const levels: SelectItem[] = [];

    for (let i = 1; i <= 30; i++) {
      levels.push({
        label: `Level-${i}`,
        value: i,
      });
    }

    this.levels = [...levels];
  }

  getUserDownlines() {
    this.loadingDownlines = true;

    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.membershipService
      .getDownlines(userDetails.id, this.selectedLevel)
      .subscribe((resp) => {
        const { downlines } = resp.data;

        this.downlines = [...downlines];
        this.loadingDownlines = false;
      });
  }

  membershipStatusText(status: string) {
    return status.toLowerCase();
  }

  getUserMembershipDetails() {
    const userDetail = this.getSavedUserDetails();

    this.membershipService.getDetails(userDetail.id).subscribe((resp) => {
      const { membership } = resp.data;

      this.userMembershipDetails = membership;
    });
  }

  goToReferralLink() {
    return (
      environment.baseUrl +
      'user/auth/register?code=' +
      this.userMembershipDetails.referral_link
    );
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

  isUserConfirmed(): boolean {
    return this.userMembershipDetails &&
      this.userMembershipDetails.status == 'confirmed'
      ? true
      : false;
  }

  isUserFullyDetailed(): boolean {
    const userDetail = this.getSavedUserDetails();
    console.log(userDetail);
    if (userDetail.btc_wallet == null || userDetail.name == null) {
      return false;
    }

    return true;
  }

  isUserAlreadyHasPaid(): boolean {
    return this.userMembershipDetails &&
      this.userMembershipDetails.paid_status == 'pending' &&
      this.userMembershipDetails.is_paid == 0
      ? true
      : false;
  }

  goToAccountPage() {
    this.router.navigate(['/user/account']);
  }

  goToCashoutPage() {
    this.router.navigate(['/user/cashout']);
  }
}
