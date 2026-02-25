import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserStore } from '../../../store/user-info/user.store';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive, MatIconModule],
    templateUrl: './header.html',
    styleUrl: './header.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
    public readonly store = inject(UserStore);
}
