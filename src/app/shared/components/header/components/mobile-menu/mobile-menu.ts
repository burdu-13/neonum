import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { AccountDetails } from '../../../../../core/auth/models/auth.model';
import { NnButton } from '../../../nn-button/nn-button';
import { NavLink } from '../nav-link/nav-link';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mobile-menu',
    imports: [NnButton, NavLink, CommonModule],
    templateUrl: './mobile-menu.html',
    styleUrl: './mobile-menu.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenu {
    protected readonly router = inject(Router);
    
    public readonly isOpen = input.required<boolean>();
    public readonly account = input<AccountDetails | null>(null);

    public readonly closed = output<void>();
    public readonly luckyClicked = output<void>();
    public readonly logoutClicked = output<void>();
}
