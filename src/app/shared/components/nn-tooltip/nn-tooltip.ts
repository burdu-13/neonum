import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
    selector: 'app-nn-tooltip',
    imports: [],
    templateUrl: './nn-tooltip.html',
    styleUrl: './nn-tooltip.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NnTooltip {
    public readonly text = signal<string>('');
    public readonly left = signal<number>(0);
    public readonly top = signal<number>(0);
    public readonly isVisible = signal<boolean>(false);
}
