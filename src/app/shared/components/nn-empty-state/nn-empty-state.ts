import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-nn-empty-state',
    imports: [MatIcon],
    templateUrl: './nn-empty-state.html',
    styleUrl: './nn-empty-state.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NnEmptyState {
    public readonly title = input.required<string>();
    public readonly description = input<string>();
    public readonly icon = input<string>('auto_awesome_motion');
}
