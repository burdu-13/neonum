import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { AccountDetails } from '../../../../core/auth/models/auth.model';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile-hero',
    imports: [CommonModule, FormsModule, NgOptimizedImage],
    templateUrl: './profile-hero.html',
    styleUrl: './profile-hero.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHero {
    public readonly user = input<AccountDetails | null>(null);
    protected readonly hasAvatarError = signal(false);
}
