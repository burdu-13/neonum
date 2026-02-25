import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonVariant } from '../../models/button.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-nn-button',
    imports: [CommonModule, MatIcon],
    templateUrl: './nn-button.html',
    styleUrl: './nn-button.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NnButton {
    public readonly label = input<string>();
    public readonly icon = input<string>();
    public readonly variant = input<ButtonVariant>('surface');
    public readonly isActive = input<boolean>(false);
    public readonly isLoading = input<boolean>(false);
    public readonly disabled = input<boolean>(false);
    public readonly type = input<'button' | 'submit'>('button');

    public readonly clicked = output<MouseEvent>();
}
