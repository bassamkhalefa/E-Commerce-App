import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  _httpClient = inject(HttpClient)

  token: string = JSON.stringify(localStorage.getItem("userToken"))




  addProductToCart(productId: string): Observable<any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId })
  }




  updataProductQuantity(productId: string, count: string): Observable<any> {
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count })
  }

  getCart(): Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart/`)
  }

  removSpecificItem(productId: string): Observable<any> {
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`


    )
  }

  clearCart(): Observable<any> {
    return this._httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/`
    )
  }


}