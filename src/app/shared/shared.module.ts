import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertComponent } from './alert/alert.component';
import { AdminNavigationHeaderComponent } from './admin-navigation-header/admin-navigation-header.component';
import { UserNavigationHeaderComponent } from './user-navigation-header/user-navigation-header.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';

import { ClipboardModule } from '@angular/cdk/clipboard';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TabMenuModule } from 'primeng/tabmenu';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';

import { MessageService } from 'primeng/api';

import { CheckReferralLinkIfExistsValidatorDirective } from './directives/validators/check-referral-link-if-exists-validator.directive';
import { CheckEmailIfAvailableValidatorDirective } from './directives/validators/check-email-if-available-validator.directive';
import { CheckTransactionHashIfAvailableValidatorDirective } from './directives/validators/check-transaction-hash-if-available-validator.directive';

@NgModule({
  imports: [CommonModule, MenubarModule, ButtonModule],
  declarations: [
    AlertComponent,
    AdminNavigationHeaderComponent,
    UserNavigationHeaderComponent,
    DragAndDropDirective,
    CheckReferralLinkIfExistsValidatorDirective,
    CheckEmailIfAvailableValidatorDirective,
    CheckTransactionHashIfAvailableValidatorDirective,
  ],
  exports: [
    AlertComponent,
    AdminNavigationHeaderComponent,
    UserNavigationHeaderComponent,
    DragAndDropDirective,
    ClipboardModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    CarouselModule,
    MenubarModule,
    TableModule,
    ToastModule,
    TabMenuModule,
    DropdownModule,
    CheckboxModule,
    InputNumberModule,
    CheckReferralLinkIfExistsValidatorDirective,
    CheckEmailIfAvailableValidatorDirective,
    CheckTransactionHashIfAvailableValidatorDirective,
  ],
  providers: [MessageService, DropdownModule],
})
export class SharedModule {}
