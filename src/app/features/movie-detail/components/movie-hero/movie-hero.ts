import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import { MetaBadge } from '../../../../shared/components/meta-badge/meta-badge';
import { CategoryPill } from '../../../../shared/components/category-pill/category-pill';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeroDisplayModel } from '../../models/cinematic.config';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-movie-hero',
    imports: [Skeleton, MetaBadge, CategoryPill, CommonModule, MatIcon, NgOptimizedImage],
    templateUrl: './movie-hero.html',
    styleUrl: './movie-hero.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieHero {
    public readonly displayData = input<HeroDisplayModel | null>(null);
    public readonly isLoading = input<boolean>(false);

    protected readonly isBackdropLoaded = signal<boolean>(false);
    protected readonly isPosterLoaded = signal<boolean>(false);

    constructor() {
        effect(() => {
            if (this.isLoading()) {
                this.isBackdropLoaded.set(false);
                this.isPosterLoaded.set(false);
            }
        });
    }
}
