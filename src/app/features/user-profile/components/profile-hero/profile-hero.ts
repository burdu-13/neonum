import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { NnButton } from '../../../../shared/components/nn-button/nn-button';
import { AccountDetails } from '../../../../core/auth/models/auth.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile-hero',
    imports: [NnButton, CommonModule, FormsModule],
    templateUrl: './profile-hero.html',
    styleUrl: './profile-hero.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHero {
    public readonly user = input<AccountDetails | null>(null);
    public readonly isOwnProfile = input(false);
    public readonly isEditMode = input(false);

    public readonly toggleEdit = output<void>();
    public readonly usernameChange = output<string>();

    protected readonly editValue = signal('');
    protected readonly defaultAvatar = 'assets/images/default-avatar.png';

    protected get avatarUrl(): string {
        const path = this.user()?.avatar?.tmdb?.avatar_path;
        return path ? `https://image.tmdb.org/t/p/w300_and_h300_face${path}` : this.defaultAvatar;
    }

    protected onSave(): void {
        if (this.editValue().trim()) {
            this.usernameChange.emit(this.editValue());
        }
    }

    protected handleImageError(event: Event): void {
        (event.target as HTMLImageElement).src = this.defaultAvatar;
    }
}
