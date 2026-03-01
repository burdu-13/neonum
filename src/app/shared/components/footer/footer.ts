import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [MatIcon, RouterLink],
    templateUrl: './footer.html',
    styleUrl: './footer.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
    protected readonly currentYear = new Date().getFullYear();
}
