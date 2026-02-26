import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    input,
    output,
    signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-nn-input',
    imports: [],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NnInput),
            multi: true,
        },
    ],
    templateUrl: './nn-input.html',
    styleUrl: './nn-input.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NnInput implements ControlValueAccessor {
    public readonly placeholder = input<string>('Search...');
    public readonly iconPath = input<string | null>(null);

    protected readonly value = signal<string>('');
    protected readonly isDisabled = signal<boolean>(false);
    protected readonly isFocused = signal<boolean>(false);

    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};

    public writeValue(value: string): void {
        this.value.set(value || '');
    }

    public registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled.set(isDisabled);
    }

    protected onInput(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        this.value.set(inputElement.value);
        this.onChange(inputElement.value);
    }

    protected onFocus(): void {
        this.isFocused.set(true);
    }

    protected onBlur(): void {
        this.isFocused.set(false);
        this.onTouched();
    }
}
