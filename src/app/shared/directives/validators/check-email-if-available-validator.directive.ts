import { Directive } from '@angular/core';
import {
  ValidationErrors,
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UserService } from '../../../core/api/user/user.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[uniqueEmail]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: CheckEmailIfAvailableValidatorDirective,
      multi: true,
    },
  ],
})
export class CheckEmailIfAvailableValidatorDirective implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.checkEmailIfExists(control.value).pipe(
      map((resp) => {
        const { valid } = resp.data;

        if (valid == false) {
          return null;
        }

        return {
          uniqueEmail: {
            isValid: false,
            message: 'email does exists',
          },
        };
      })
    );
  }
}
