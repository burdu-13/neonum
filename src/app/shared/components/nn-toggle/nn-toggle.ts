import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { ToggleOption } from './models/toggle.model';

@Component({
    selector: 'app-nn-toggle',
    imports: [],
    templateUrl: './nn-toggle.html',
    styleUrl: './nn-toggle.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NnToggle {
    public readonly value = model.required<string>();
    public readonly options = input.required<ToggleOption[]>();

    protected readonly sliderStyle = computed(() => {
        const index = this.options().findIndex((o) => o.value === this.value());
        const width = 100 / this.options().length;
        return {
            width: `${width}%`,
            transform: `translateX(${index * 100}%)`,
        };
    });

    protected select(value: string): void {
        this.value.set(value);
    }
}
