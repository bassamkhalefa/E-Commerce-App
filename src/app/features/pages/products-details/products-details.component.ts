import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductItemComponent } from "../../../shared/components/UI/product-item/product-item.component";
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products-details',
  imports: [CarouselModule, ProductItemComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss'
})
export class ProductsDetailsComponent implements OnInit {
  isLoading: boolean = false
  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _productService = inject(ProductService)
  private readonly _cartService = inject(CartService)
  private readonly _toasts = inject(ToastrService)


  productDetails: Product = {} as Product
  recentproducts!: Product[]
  APIError!: string

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }


  ngOnInit(): void {
    this.getID()

  }



  getID() {
    this._activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        console.log(res?.params?.id);
        console.log(res?.params?.id);
        this.getDetails(res?.params?.id)
      },

      error: (err) => {
        console.log(err)
        this.APIError = err.error.message

      },
    })

    // let { id }: any = this._activatedRoute.snapshot.params;
    // console.log(id);
    // this.getDetails(id)
  }





  getDetails(id: string) {

    this._productService.getProductById(id).subscribe({
      next: (res) => {

        console.log(res)
        this.productDetails = res.data
        this.getRelatedProducts(this.productDetails.category._id)


      },
    })
  }

  getRelatedProducts(categoryId: string) {
    this._productService.getproducts(categoryId).subscribe({
      next: (res) => {
        console.log(res);
        this.recentproducts = res.data
      }
    })
  }

  addToCart(id: string) {
    this.isLoading = true
    this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res)
        this.isLoading = false
        this._toasts.success(res.message, 'hiii');


      },
    })
  }

}

