import { Component, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CashoutService } from 'src/app/core/api/cashout/cashout.service';

@Component({
  selector: 'app-cashouts',
  templateUrl: './cashouts.component.html',
  styleUrls: ['./cashouts.component.scss'],
})
export class CashoutsComponent implements OnInit, OnDestroy {
  public cashouts: any[];
  public cashoutsTotalCount: number = 0;
  public loadingCashouts: boolean = true;
  public showCashoutModal: boolean = false;
  public showConfirmCashoutModal: boolean = false;
  public selectedCashout: any;
  public processingConfirmCashout: boolean = false;
  public processingDenyCashout: boolean = false;
  public statusFilters: SelectItem[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Denied', value: 'denied' },
    { label: 'All', value: 'all' },
  ];
  public statusFilter: string = 'all';
  public searchMemberNameKeyword: string = '';
  private cashoutsSubscription: Subscription;

  constructor(
    private messageService: MessageService,
    private cashoutService: CashoutService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.cashoutsSubscription)
      this.cashoutsSubscription.unsubscribe();
  }

  getAllCashouts($event: LazyLoadEvent) {
    const offset: number = $event.first;
    const limit: number = $event.rows;

    this.queryAllCashouts(offset, limit);
  }

  filterAllCashouts() {
    this.queryAllCashouts(0, 15);
  }

  private queryAllCashouts(offset: number, limit: number) {
    this.loadingCashouts = true;

    this.cashoutsSubscription = this.cashoutService
      .getAll(offset, limit, [
        { key: 'status', value: this.statusFilter },
        { key: 'member_name', value: this.searchMemberNameKeyword },
      ])
      .subscribe((resp) => {
        const { cashouts } = resp.data;

        this.cashoutsTotalCount = cashouts.total_count;
        this.cashouts = [...cashouts.data];

        this.loadingCashouts = false;
      });
  }

  cashoutStatusText(status: string) {
    return status.toLowerCase();
  }

  selectCashout(cashout: any) {
    console.log(cashout);
    this.selectedCashout = cashout;
    this.showCashoutModal = true;
  }

  confirmCashout(cashoutId: number) {
    console.log(this.selectedCashout);
    this.processingConfirmCashout = true;

    this.cashoutService
      .confirm(cashoutId, this.selectedCashout.transaction_hash, this.selectedCashout.accepted_interest, this.selectedCashout.accepted_unilevel_points)
      .subscribe((resp) => {
        console.log(resp);
        this.processingConfirmCashout = false;
        this.showCashoutModal = false;
        this.showConfirmCashoutModal = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated Successfuly',
        });
        this.getAllCashouts({
          first: 0,
          rows: 5,
        });
      });
  }

  checkTransactionHash(transactionHash: string) {
    return `https://www.blockchain.com/btc/tx/${transactionHash}`;
  }

  denyMembership(cashoutId: number) {
    this.processingDenyCashout = true;

    this.cashoutService.deny(cashoutId).subscribe((resp) => {
      console.log(resp);
      this.processingDenyCashout = false;
      this.showCashoutModal = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Updated Successfuly',
      });
      this.getAllCashouts({
        first: 0,
        rows: 5,
      });
    });
  }
}
