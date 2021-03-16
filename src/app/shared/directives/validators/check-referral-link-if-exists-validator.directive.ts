import { Directive } from '@angular/core';
import {
  ValidationErrors,
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MembershipService } from '../../../core/api/membership/membership.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[existsReferralLink]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: CheckReferralLinkIfExistsValidatorDirective,
      multi: true,
    },
  ],
})
export class CheckReferralLinkIfExistsValidatorDirective
  implements AsyncValidator {
  constructor(private membershipService: MembershipService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.membershipService.checkReferralLinkIfExists(control.value).pipe(
      map((resp) => {
        const { valid } = resp.data;

        if (valid == true) {
          return null;
        }

        return {
          existsReferralLink: {
            isValid: false,
            message: 'referralId does not exists',
          },
        };
      })
    );
  }
}
