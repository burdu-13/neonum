import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(
            routes,
            withComponentInputBinding(),
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            }),
        ),
        provideHttpClient(withInterceptors([authInterceptor])),
        {
            provide: IMAGE_LOADER,
            useValue: (config: ImageLoaderConfig) => {
                if (!config.src) return '';

                const widths = [92, 154, 185, 342, 500, 780];

                const width = config.width
                    ? widths.find((w) => w >= config!.width!) || 'original'
                    : 342;

                const sizePath = width === 'original' ? 'original' : `w${width}`;

                return `https://image.tmdb.org/t/p/${sizePath}${config.src}`;
            },
        },
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
            connectInZone: true,
        }),
    ],
};
