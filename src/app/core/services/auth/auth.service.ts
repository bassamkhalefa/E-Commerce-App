// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { AuthUser, LogingUser } from '../../interfaces/auth-user';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { API_Base_URL } from '../../../token/api-token';
// import { jwtDecode } from 'jwt-decode';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   _httpclint = inject(HttpClient)
//   _baseURL = inject(API_Base_URL)
//   _router = inject(Router)

//   userData: BehaviorSubject<any> = new BehaviorSubject(null)
//   constructor() { }
//   registerUser(userInfo: AuthUser): Observable<any> {

//     return this._httpclint.post(`${this._baseURL}/auth/signup`, userInfo)

//   }
//   LoginUser(userInfo: LogingUser): Observable<any> {

//     return this._httpclint.post(`${this._baseURL}/auth/signin`, userInfo)

//   }
//   saveUser() {
//     if (localStorage.getItem("userToke")) {

//       this.userData.next(jwtDecode(localStorage.getItem("userToke")!))
//       console.log(this.userData)

//     }

//   }

//   isLogedIngUser(): boolean {
//     if (localStorage.getItem("userToke")) {

//       this.userData.next(jwtDecode(localStorage.getItem("userToke")!))
//       return true
//     } else {
//       return false
//     }
//   }
//   logOut() {

//     localStorage.removeItem("userToken"),

//       this.userData.next(null),

//       this._router.navigate(['/auth/login'])
//   }

// }


import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthUser, LogingUser } from '../../interfaces/auth-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_Base_URL } from '../../../token/api-token';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _httpclint = inject(HttpClient);
  _baseURL = inject(API_Base_URL);
  _router = inject(Router);
  _platformId = inject(PLATFORM_ID);  // حقن PLATFORM_ID لمعرفة البيئة

  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  registerUser(userInfo: AuthUser): Observable<any> {
    return this._httpclint.post(`${this._baseURL}/auth/signup`, userInfo);
  }

  LoginUser(userInfo: LogingUser): Observable<any> {
    return this._httpclint.post(`${this._baseURL}/auth/signin`, userInfo);
  }

  saveUser() {
    // التحقق من أن الكود يعمل في بيئة المتصفح
    if (isPlatformBrowser(this._platformId)) {
      if (localStorage.getItem("userToken")) {
        this.userData.next(jwtDecode(localStorage.getItem("userToken")!));
        console.log(this.userData);
      }
    }
  }

  isLogedIngUser(): boolean {
    // التحقق من أن الكود يعمل في بيئة المتصفح
    if (isPlatformBrowser(this._platformId)) {
      if (localStorage.getItem("userToken")) {
        this.userData.next(jwtDecode(localStorage.getItem("userToken")!));
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  logOut() {
    // التحقق من أن الكود يعمل في بيئة المتصفح
    if (isPlatformBrowser(this._platformId)) {
      localStorage.removeItem("userToken");
      this.userData.next(null);
      this._router.navigate(['/auth/login']);
    }
  }
}
