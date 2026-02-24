import { Component, inject } from '@angular/core';
import { AlertService } from '../../services/alert/alert';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-alert',
    imports: [CommonModule, MatIconModule],
    templateUrl: './alert.html',
    styleUrl: './alert.scss',
})
export class AlertUi {
    private readonly alertService = inject(AlertService);
    public readonly alert$ = this.alertService.alert$;

    public onClose(): void {
        this.alertService.clear();
    }
}
