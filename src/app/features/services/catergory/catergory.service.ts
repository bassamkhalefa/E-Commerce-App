import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatergoryService {
  _httpClient = inject(HttpClient)

  constructor() { }

  getcatergoy(): Observable<any> {

    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }



}
