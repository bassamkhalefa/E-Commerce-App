import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_Base_URL } from './token/api-token';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideHttpClient(withFetch(), withInterceptors([tokenInterceptor, loadingInterceptor,httpErrorInterceptor],)),
  importProvidersFrom([BrowserAnimationsModule]),

  {
    provide: API_Base_URL,
    useValue: `https://ecommerce.routemisr.com/api/v1`
  },

  provideToastr()
  ]
};


