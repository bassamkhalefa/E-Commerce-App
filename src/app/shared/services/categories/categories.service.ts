import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_Base_URL } from '../../../token/api-token';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  _baseURL = inject(API_Base_URL)

  private readonly _httpClient = inject(HttpClient)

  constructor() { }

  getAllcategories(): Observable<any> {
    return this._httpClient.get(`${this._baseURL}/categories`)
  }

}
