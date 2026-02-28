import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NnButton } from "../nn-button/nn-button";

@Component({
    selector: 'app-nn-guest-banner',
    imports: [NnButton],
    templateUrl: './nn-guest-banner.html',
    styleUrl: './nn-guest-banner.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NnGuestBanner {
    hoursRemaining = input.required<number>();
    upgradeRequested = output<void>();
}
