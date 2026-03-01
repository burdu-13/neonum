import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-brand-logo',
    imports: [RouterLink],
    templateUrl: './brand-logo.html',
    styleUrl: './brand-logo.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandLogo {
    protected readonly clicked = output<void>();
}
