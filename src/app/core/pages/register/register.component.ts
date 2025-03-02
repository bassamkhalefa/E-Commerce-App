import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from "../../../shared/components/UI/error-message/error-message.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  _authService = inject(AuthService)
  _router = inject(Router)
  apiErroe!: string
  isCallingApi: boolean = false
  subscription: Subscription = new Subscription()

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('Bassamkhalefa@yahoo.com', [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{5}$/)]),
    rePassword: new FormControl(null, Validators.pattern(/^[A-Z]\w{5}$/)),
    phone: new FormControl(null, [Validators.required, Validators.pattern('01[0125][0-9]{8}')])
  }, this.validtionrepassword);

  register() {
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
    } else {

      this.apiErroe = ""

      this.isCallingApi = true
      if (this.subscription) this.subscription.unsubscribe()
      this.subscription = this._authService.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res)
          this.isCallingApi = false
          this._router.navigate(['/auth/login'])
        },
        error: (err) => {
          this.apiErroe = err.error.message
          this.isCallingApi = false
          console.log(err)
        },
        complete: () => { }

      })


    }
  }

  validtionrepassword(form: AbstractControl) {
    const password = form.get('password')?.value
    const repassword = form.get('rePassword')?.value
    if (password == repassword) {
      return null

    } else {

      return { misMatch: true }
    }

  }
  ngOnDestroy(): void {

    this.subscription.unsubscribe()

  }

}


