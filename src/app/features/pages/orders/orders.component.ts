import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { OrderService } from '../../../shared/services/order/order.service';
import { Order } from '../../../shared/interfaces/order';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})

export class OrdersComponent implements OnInit {

  private readonly _authService = inject(AuthService)
  private readonly _orderService = inject(OrderService)

  AllOrder: Order[] = []
  ngOnInit(): void {
    this.getUserId()
  }

  getUserId() {

    this._authService.userData.subscribe({
      next: (res) => {
        console.log(res)
        res.id && this.getAllOrders(res.id)
      }
    })
  }

  getAllOrders(id: string) {
    this._orderService.getUserOdrer(id).subscribe({
      next: (res) => {
        console.log(res)
        this.AllOrder = res

      }
    })

  }


}
