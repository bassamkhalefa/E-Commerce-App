import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../shared/services/order/order.service';


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})

export class CheckoutComponent implements OnInit {

  private readonly _activatedRoute = inject(ActivatedRoute)

  cartId!: string
  private readonly _orderService = inject(OrderService)

  checkoutForm!: FormGroup

  ngOnInit() {
    this.getCartId()
    this.initForm()
  }

  getCartId() {

    this.cartId = this._activatedRoute.snapshot.params['cartId']

  }

  initForm() {
    this.checkoutForm = new FormGroup({
      details: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    })
  }

  completeOrder() {

    //   this._orderService.cashOrder(this.cartId, this.checkoutForm.value).subscribe({
    //     next: (res) => {

    //       console.log(res);

    //     },
    //   })
    // }


    this._orderService.onlinePayment(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res.session.url)
        open(res.session.url)
      }
    })




  }
}
