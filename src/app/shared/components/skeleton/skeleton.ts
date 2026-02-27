import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SkeletonType } from './models/skeleton.model';

@Component({
    selector: 'app-skeleton',
    imports: [],
    templateUrl: './skeleton.html',
    styleUrl: './skeleton.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skeleton {
    type = input<SkeletonType>('default');
    width = input<string>('100%');
    height = input<string>('1rem');
    radius = input<string>('0.4rem');

    dimensions = computed(() => {
        switch (this.type()) {
            case 'card':
                return { w: '100%', h: 'auto', r: '1.2rem', aspect: '2/3' };
            case 'pill':
                return { w: '12rem', h: '3.6rem', r: '100rem', aspect: 'initial' };
            case 'title':
                return { w: '60%', h: '4.8rem', r: '0.4rem', aspect: 'initial' };
            default:
                return { w: this.width(), h: this.height(), r: this.radius(), aspect: 'initial' };
        }
    });
}
