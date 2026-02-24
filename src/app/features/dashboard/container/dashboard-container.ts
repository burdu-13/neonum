import { Component, inject } from '@angular/core';
import { UserStore } from '../../../info/user-info/user.store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-dashboard-container',
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './dashboard-container.html',
    styleUrl: './dashboard-container.scss',
})
export class DashboardContainer {
    public readonly store = inject(UserStore);
}
