import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
    selector: 'app-brand-logo',
    imports: [],
    templateUrl: './brand-logo.html',
    styleUrl: './brand-logo.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandLogo {
    protected readonly clicked = output<void>();
}
