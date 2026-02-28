import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Skeleton } from '../../../../shared/components/skeleton/skeleton';
import { MetaBadge } from '../../../../shared/components/meta-badge/meta-badge';
import { CategoryPill } from '../../../../shared/components/category-pill/category-pill';
import { CommonModule } from '@angular/common';
import { HeroDisplayModel } from '../../models/cinematic.config';

@Component({
    selector: 'app-movie-hero',
    imports: [Skeleton, MetaBadge, CategoryPill, CommonModule],
    templateUrl: './movie-hero.html',
    styleUrl: './movie-hero.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieHero {
    public readonly displayData = input<HeroDisplayModel | null>(null);
    public readonly isLoading = input<boolean>(false);
}
