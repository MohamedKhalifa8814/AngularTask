import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { tokenInterceptor } from './Interceptors/token.interceptor';
import { loaderInterceptor } from './Interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })
    , provideRouter(routes, withComponentInputBinding())
    , provideHttpClient(withFetch(), withJsonpSupport(), withInterceptors([tokenInterceptor, loaderInterceptor]))]
};
