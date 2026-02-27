import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-profile-stats',
    imports: [],
    templateUrl: './profile-stats.html',
    styleUrl: './profile-stats.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileStats {
    public readonly watchlistCount = input.required<number>();
    public readonly favoritesCount = input.required<number>();

    protected readonly statItems = computed(() => [
        { label: 'Watchlist', value: this.watchlistCount() },
        { label: 'Favorites', value: this.favoritesCount() },
    ]);
}
