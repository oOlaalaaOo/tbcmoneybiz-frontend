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
  selector: '[uniqueTransactionHash]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: CheckTransactionHashIfAvailableValidatorDirective,
      multi: true,
    },
  ],
})
export class CheckTransactionHashIfAvailableValidatorDirective
  implements AsyncValidator {
  constructor(private membership: MembershipService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.membership.checkTransactionHashIfExists(control.value).pipe(
      map((resp) => {
        const { valid } = resp.data;

        if (valid == false) {
          return null;
        }

        return {
          uniqueTransactionHash: {
            isValid: false,
            message: 'transactionHash does not exists',
          },
        };
      })
    );
  }
}
