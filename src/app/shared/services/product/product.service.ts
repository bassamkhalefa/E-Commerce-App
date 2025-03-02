import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_Base_URL } from '../../../token/api-token';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _httpClient = inject(HttpClient)
  private readonly _baseURL = inject(API_Base_URL)

  constructor() { }


  getproducts(categoryId?: string): Observable<any> {
    let url = categoryId ? `${this._baseURL}/products?category[in]=${categoryId}` : `${this._baseURL}/products`

    return this._httpClient.get(`${this._baseURL}/products`)
  }

  getProductById(id: string): Observable<any> {
    return this._httpClient.get(`${this._baseURL}/products/${id}`)
  }




}
