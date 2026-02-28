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
        const options = this.options();
        const index = options.findIndex((o) => o.value === this.value());

        const segmentWidth = 100 / options.length;

        return {
            width: `calc(${segmentWidth}% - 0.4rem)`,
            transform: `translateX(calc(${index * 100}%))`,
        };
    });

    protected select(value: string): void {
        this.value.set(value);
    }
}
