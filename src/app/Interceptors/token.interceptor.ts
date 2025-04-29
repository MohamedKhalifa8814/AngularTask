import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserServiceService } from '../Services/user-service.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // const tokenService = inject(UserServiceService);
  if (req.url.includes('/auth/')) {
    return next(req);
  }
  // const token = tokenService.getToken();
  const mytoken = 'asdasfedmzo'
  if (mytoken) {
    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer: ${mytoken}`
      }
    })
    console.log('interceptor', newReq, next)
    return next(newReq);
  }
  return next(req);
};
