import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartDeatils!: Cart
  emptyCart: boolean = false
  isLoading: boolean = true
  private readonly _cartService = inject(CartService)

  ngOnInit(): void {
    this.getCart()
  }

  getCart() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDeatils = res
        this.isLoading = false

      },
    })
  }

  removeItem(id: string) {
    this.isLoading = true

    this._cartService.removSpecificItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDeatils = res
        this.isLoading = false



      },
    })
  }


  updataCount(id: string, count: number) {
    this.isLoading = true

    this._cartService.updataProductQuantity(id, `${count}`).subscribe({

      next: (res) => {
        console.log(res);
        this.cartDeatils = res
        this.isLoading = false


      },
    })
  }

  clearCart() {
    this.isLoading = true
    this._cartService.clearCart().subscribe({


      next: (res) => {
        console.log(res);

        if (res.message == 'success') {
          this.cartDeatils = {} as Cart;
          this.emptyCart = true
          this.isLoading = false

        }

      },
    })
  }
}
