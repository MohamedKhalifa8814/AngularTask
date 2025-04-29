import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderServiceService } from '../Services/loader-service.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderServiceService)
  if (req.url.includes('/no-loader')) {
    return next(req);
  }
  loaderService.show();
  return next(req).pipe(
    finalize(() => loaderService.hide())
  );
};
