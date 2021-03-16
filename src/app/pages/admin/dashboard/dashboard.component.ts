import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/api/user/user.service';
import { MembershipService } from 'src/app/core/api/membership/membership.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public memberStats: any;
  public membershipStats: any;

  constructor(
    private userService: UserService,
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {
    this.getMemberStats();
    this.getMembershipStats();
  }

  getMemberStats() {
    this.userService.getStats().subscribe((resp) => {
      console.log(resp);
      const { data } = resp;

      this.memberStats = data;
    });
  }

  getMembershipStats() {
    this.membershipService.getStats().subscribe((resp) => {
      console.log(resp);
      const { data } = resp;

      this.membershipStats = data;
    });
  }
}
