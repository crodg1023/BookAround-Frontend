import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = sessionStorage.getItem('token');

  if (userToken) {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${userToken}`
      }
    });
  }

  return next(req);
};
