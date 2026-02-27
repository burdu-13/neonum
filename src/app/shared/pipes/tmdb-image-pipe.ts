import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tmdbImage',
})
export class TmdbImagePipe implements PipeTransform {
    private readonly baseUrl = 'https://image.tmdb.org/t/p/';
    private readonly defaultAvatar = '/images/png/common/default-avatar.png';

    transform(
        path: string | null | undefined,
        size: string = 'w150',
        type: 'poster' | 'profile' = 'poster',
    ): string | null {
        if (!path) {
            return type === 'profile' ? this.defaultAvatar : null;
        }

        if (path.startsWith('http')) {
            return path.startsWith('/http') ? path.substring(1) : path;
        }

        return `${this.baseUrl}${size}${path}`;
    }
}
