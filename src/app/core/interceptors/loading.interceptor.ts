import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService)


  spinner.show();

  // setTimeout(() => {
  //   /** spinner ends after 5 seconds */
  //   this.spinner.hide();
  // }, 5000);


  return next(req).pipe(finalize(() => {
    spinner.hide();

  }));
};
