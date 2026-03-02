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
                if (!config.src || config.src === 'null') return '';

                const isLocal =
                    config.src.includes('images/') ||
                    config.src.includes('assets/') ||
                    config.src.endsWith('.webp');

                if (isLocal) {
                    const path = config.src.startsWith('/') ? config.src : `/${config.src}`;
                    return path.replace(/\\/g, '/');
                }

                const posterWidths = [92, 154, 185, 342, 500, 780];
                const backdropWidths = [300, 780, 1280];
                const isBackdrop = config.src.includes('backdrop');
                const availableWidths = isBackdrop ? backdropWidths : posterWidths;

                const width = config.width
                    ? availableWidths.find((w) => w >= config.width!) ||
                      availableWidths[availableWidths.length - 1]
                    : isBackdrop
                      ? 780
                      : 342;

                return `https://image.tmdb.org/t/p/w${width}${config.src.startsWith('/') ? config.src : `/${config.src}`}`;
            },
        },
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
            connectInZone: true,
        }),
    ],
};
