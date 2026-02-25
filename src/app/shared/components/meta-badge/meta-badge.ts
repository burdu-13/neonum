import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-meta-badge',
    imports: [MatIcon],
    templateUrl: './meta-badge.html',
    styleUrl: './meta-badge.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaBadge {
    public readonly text = input.required<string | number | null>();
    public readonly icon = input<string>();
    public readonly highlight = input<boolean>(false);
}
