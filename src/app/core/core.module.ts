import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './api/user/user.service';
import { AuthService } from './api/auth/auth.service';
import { ConfirmPasswordMatchValidatorDirective } from './utils/confirm-password-match-validator.util';
import { AuthGuard } from './guards/auth.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { BlockchainService } from './api/blockchain/blockchain.service';
import { MembershipService } from './api/membership/membership.service';
import { CashoutService } from './api/cashout/cashout.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [
    UserService,
    AuthService,
    BlockchainService,
    MembershipService,
    CashoutService,
    AuthGuard,
    AuthAdminGuard,
    ConfirmPasswordMatchValidatorDirective,
  ],
})
export class CoreModule {}
