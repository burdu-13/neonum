import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-nav-link',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './nav-link.html',
    styleUrl: './nav-link.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLink {
    public readonly path = input.required<string>();
    protected readonly exact = input(false);
    protected readonly clicked = output<void>();
}
