import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/product/product.service';
import { Product } from '../../../../../shared/interfaces/product';
import { ProductItemComponent } from "../../../../../shared/components/UI/product-item/product-item.component";
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.scss'
})
export class RecentProductsComponent implements OnInit {
  product!: Product[]
  private readonly _productService = inject(ProductService)
  private readonly _cartService = inject(CartService)
  private readonly _toasts = inject(ToastrService)




  ngOnInit(): void {
    this.getProducts()
  }


  getProducts() {
    this._productService.getproducts().subscribe({
      next: (res) => {
        console.log(res.data)
        this.product = res.data
      },
      error: (err) => {
        console.log(err)

      },
      complete() {
        console.log("complete")
      },

    })
  }


  addToCart(id: string) {
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._toasts.success(res.message, 'hiii');


      },
    })


  }
}
