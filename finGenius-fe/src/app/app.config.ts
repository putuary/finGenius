import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withHashLocation,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { refreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { authHeaderInterceptor } from './interceptors/auth-header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withHashLocation()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authHeaderInterceptor, refreshTokenInterceptor])
    ),
    provideAnimationsAsync(),
  ],
};
