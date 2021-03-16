import { Directive } from '@angular/core';
import {
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  NG_VALIDATORS,
} from '@angular/forms';

// @Directive({
//   selector: '[ConfirmPasswordMatch]',
//   providers: [
//     {
//       provide: NG_VALIDATORS,
//       useExisting: ConfirmPasswordMatchValidatorDirective,
//       multi: true,
//     },
//   ],
// })
export class ConfirmPasswordMatchValidatorDirective {
  constructor() {}

  validate(
    controlName: string,
    matchingControlName: string
  ): ValidationErrors | null {
    return (formGroup: FormGroup): ValidatorFn => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ isMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
