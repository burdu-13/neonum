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

                const posterWidths = [92, 154, 185, 342, 500, 780];
                const backdropWidths = [300, 780, 1280];

                const availableWidths = config.src.includes('backdrop')
                    ? backdropWidths
                    : posterWidths;

                let sizePath: string;
                if (config.width && config.width > availableWidths[availableWidths.length - 1]) {
                    sizePath = 'original';
                } else {
                    const width = config.width
                        ? availableWidths.find((w) => w >= config.width!) ||
                          availableWidths[availableWidths.length - 1]
                        : availableWidths.includes(780)
                          ? 780
                          : 342;
                    sizePath = `w${width}`;
                }

                const cleanHash = config.src.startsWith('/') ? config.src : `/${config.src}`;
                return `https://image.tmdb.org/t/p/${sizePath}${cleanHash}`;
            },
        },
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
            connectInZone: true,
        }),
    ],
};
