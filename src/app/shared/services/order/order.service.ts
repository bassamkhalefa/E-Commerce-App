import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shippingAddress } from '../../interfaces/payment';

@Injectable({
  providedIn: 'root'

})

export class OrderService {


  private readonly _httpClient = inject(HttpClient)
  token = JSON.stringify(localStorage.getItem("userToken"))

  cashOrder(id: string, data: shippingAddress): Observable<any> {

    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, { data }, {
      headers: {
        token: JSON.parse(this.token)
        
      }

    })

  }
  getAllOdrer(): Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
  }
  getUserOdrer(id: string): Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  }

  onlinePayment(id: string, data: shippingAddress): Observable<any> {

    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`, { data },
      {
        headers: {
          token: JSON.parse(this.token)
        }
      })
  }
}

