import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { NnButton } from '../nn-button/nn-button';
import { UserStore } from '../../../store/user-info/user.store';

@Component({
    selector: 'app-nn-guest-banner',
    imports: [NnButton],
    templateUrl: './nn-guest-banner.html',
    styleUrl: './nn-guest-banner.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NnGuestBanner {
    protected readonly userStore = inject(UserStore);
    protected readonly hoursRemaining = input.required<number>();
    protected readonly upgradeRequested = output<void>();

    protected onEndSession(): void {
        this.userStore.logout();
    }
}
