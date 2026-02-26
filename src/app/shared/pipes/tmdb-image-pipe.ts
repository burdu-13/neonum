import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tmdbImage',
})
export class TmdbImagePipe implements PipeTransform {
    private readonly baseUrl = 'https://image.tmdb.org/t/p/';
    transform(path: string | null | undefined, size: string = 'w150'): string | null {
        if (!path) return null;

        if (path.startsWith('http')) {
            return path.startsWith('/http') ? path.substring(1) : path;
        }

        return `${this.baseUrl}${size}${path}`;
    }
}
