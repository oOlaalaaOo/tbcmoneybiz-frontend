import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/api/user/user.service';
import { MessageService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit, OnDestroy {
  public members: any[];
  public membersTotalCount: number = 0;
  public loadingMembers: boolean = true;
  public showMemberModal: boolean = false;
  public selectedMember: any;
  public processingConfirmMember: boolean = false;
  public processingDenyMember: boolean = false;
  public statusFilters: SelectItem[] = [
    { label: 'Activated', value: 'activated' },
    { label: 'Deactivated', value: 'deactivated' },
    { label: 'All', value: 'all' },
  ];
  public statusFilter: string = 'all';
  public searchMemberNameKeyword: string = '';
  private membersSubscription: Subscription;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.membersSubscription) this.membersSubscription.unsubscribe();
  }

  getAllMembers($event: LazyLoadEvent) {
    const offset: number = $event.first;
    const limit: number = $event.rows;

    this.queryAllMembers(offset, limit);
  }

  filterAllMembers() {
    this.queryAllMembers(0, 15);
  }

  private queryAllMembers(offset: number, limit: number) {
    this.loadingMembers = true;

    this.membersSubscription = this.userService
      .getAll(offset, limit, [
        { key: 'status', value: this.statusFilter },
        { key: 'name', value: this.searchMemberNameKeyword },
      ], true)
      .subscribe((resp) => {
        const { users } = resp.data;

        this.membersTotalCount = users.total_count;
        this.members = [...users.data];

        this.loadingMembers = false;
      });
  }

  memberStatusText(status: string) {
    return status.toLowerCase();
  }

  selectMember(membership: any) {
    this.selectedMember = membership;
    this.showMemberModal = true;
  }

  confirmMembership(membershipId: number) {
    this.processingConfirmMember = true;

    // this.userService.confirm(membershipId).subscribe((resp) => {
    //   console.log(resp);
    //   this.processingConfirmMember = false;
    //   this.showMemberModal = false;
    //   this.messageService.add({
    //     severity: 'success',
    //     summary: 'Success',
    //     detail: 'Updated Successfuly',
    //   });
    //   this.getAllMemberships({
    //     first: 0,
    //     rows: 5,
    //   });
    // });
  }

  checkTransactionHash(transactionHash: string) {
    return `https://www.blockchain.com/btc/tx/${transactionHash}`;
  }
}
