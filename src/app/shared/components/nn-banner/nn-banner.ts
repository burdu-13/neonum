import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
    selector: 'app-nn-banner',
    imports: [NgOptimizedImage],
    templateUrl: './nn-banner.html',
    styleUrl: './nn-banner.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NnBanner {
    public readonly imageSrc = input.required<string>();
    public readonly label = input<string>('');
    public readonly title = input.required<string>();
    public readonly description = input<string>();
}
