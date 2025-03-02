import { Component, Inject, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { ErrorMessageComponent } from "../../../shared/components/UI/error-message/error-message.component";
import { CustomInputComponent } from "../../../shared/components/UI/custom-input/custom-input.component";


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ErrorMessageComponent, CustomInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnDestroy, OnInit {
  apiErroe!: string
  isCallingApi: boolean = false
  subscription: Subscription = new Subscription()
  _formBuilder = inject(FormBuilder)
  loginForm!: FormGroup
  toggleInput: boolean = false


  ngOnInit(): void {
    this.initForm()
  }
  initForm() {

    this.loginForm = new FormGroup({
      email: new FormControl('Bassamkhalefa@yahoo.com', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{5}$/)]),

    });
  }

  _authService = inject(AuthService)
  _router = inject(Router)


  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {

      this.apiErroe = ""

      this.isCallingApi = true
      if (this.subscription) this.subscription.unsubscribe()
      this.subscription = this._authService.LoginUser(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res)
          this.isCallingApi = false
          this._router.navigate(['/home'])
          localStorage.setItem("userToken", res.token)
          this._authService.saveUser()

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

  togglepassword() {
    this.toggleInput = !this.toggleInput
  }


  ngOnDestroy(): void {

    this.subscription.unsubscribe()

  }

}

