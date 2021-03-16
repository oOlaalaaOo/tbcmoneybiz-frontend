import { Component, OnDestroy, OnInit } from '@angular/core';
import { MembershipService } from '../../../core/api/membership/membership.service';
import { LazyLoadEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss'],
})
export class MembershipsComponent implements OnInit, OnDestroy {
  public memberships: any[];
  public membershipsTotalCount: number = 0;
  public loadingMemberships: boolean = true;
  public showMembershipModal: boolean = false;
  public showConfirmMembershipModal: boolean = false;
  public selectedMembership: any;
  public processingConfirmMembership: boolean = false;
  public processingDenyMembership: boolean = false;
  public statusFilters: SelectItem[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Denied', value: 'denied' },
    { label: 'All', value: 'all' },
  ];
  public statusFilter: string = 'all';
  public searchMemberNameKeyword: string = '';
  private membershipsSubscription: Subscription;

  constructor(
    private membershipService: MembershipService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.membershipsSubscription)
      this.membershipsSubscription.unsubscribe();
  }

  getAllMemberships($event: LazyLoadEvent) {
    const offset: number = $event.first;
    const limit: number = $event.rows;

    this.queryAllMemberships(offset, limit);
  }

  filterAllMemberships() {
    this.queryAllMemberships(0, 15);
  }

  private queryAllMemberships(offset: number, limit: number) {
    this.loadingMemberships = true;

    this.membershipsSubscription = this.membershipService
      .getAll(offset, limit, [
        { key: 'paid_status', value: this.statusFilter },
        { key: 'member_name', value: this.searchMemberNameKeyword },
      ])
      .subscribe((resp) => {
        const { memberships } = resp.data;

        this.membershipsTotalCount = memberships.total_count;
        this.memberships = [...memberships.data];

        this.loadingMemberships = false;
      });
  }

  membershipStatusText(status: string) {
    return status.toLowerCase();
  }

  selectMembership(membership: any) {
    console.log(membership);
    this.selectedMembership = membership;
    this.showMembershipModal = true;
  }

  confirmMembership(membershipId: number, markAsPaid: boolean) {
    this.processingConfirmMembership = true;

    this.membershipService
      .confirm(membershipId, markAsPaid)
      .subscribe((resp) => {
        console.log(resp);
        this.processingConfirmMembership = false;
        this.showMembershipModal = false;
        this.showConfirmMembershipModal = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated Successfuly',
        });
        this.getAllMemberships({
          first: 0,
          rows: 5,
        });
      });
  }

  markAsUnpaidMembership(membershipId: number) {
    this.processingConfirmMembership = true;

    this.membershipService
      .markAsUnpaid(membershipId)
      .subscribe((resp) => {
        console.log(resp);
        this.processingConfirmMembership = false;
        this.showMembershipModal = false;
        this.showConfirmMembershipModal = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated Successfuly',
        });
        this.getAllMemberships({
          first: 0,
          rows: 5,
        });
      });
  }

  markAsPaidMembership(membershipId: number) {
    this.processingConfirmMembership = true;

    this.membershipService
      .markAsPaid(membershipId)
      .subscribe((resp) => {
        console.log(resp);
        this.processingConfirmMembership = false;
        this.showMembershipModal = false;
        this.showConfirmMembershipModal = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated Successfuly',
        });
        this.getAllMemberships({
          first: 0,
          rows: 5,
        });
      });
  }

  checkTransactionHash(transactionHash: string) {
    return `https://www.blockchain.com/btc/tx/${transactionHash}`;
  }

  denyMembership(membershipId: number) {
    this.processingDenyMembership = true;

    this.membershipService.deny(membershipId).subscribe((resp) => {
      console.log(resp);
      this.processingDenyMembership = false;
      this.showMembershipModal = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Updated Successfuly',
      });
      this.getAllMemberships({
        first: 0,
        rows: 5,
      });
    });
  }
}
