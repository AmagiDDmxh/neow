import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
  public static formCheck (c: AbstractControl): ValidationErrors | null {
    const { passphrase1, passphrase2, wif, name } = c.value

    console.log(passphrase1, passphrase2)

    return null
  }
}
