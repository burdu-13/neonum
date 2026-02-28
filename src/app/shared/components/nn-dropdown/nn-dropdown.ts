import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    HostListener,
    inject,
    input,
    model,
    signal,
} from '@angular/core';
import { DropdownOption } from './models/dropdown.model';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-nn-dropdown',
    imports: [MatIcon],
    templateUrl: './nn-dropdown.html',
    styleUrl: './nn-dropdown.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NnDropdown {
    private readonly elementRef = inject(ElementRef);

    public readonly value = model.required<string>();
    public readonly options = input.required<DropdownOption[]>();
    public readonly placeholder = input<string>('Select option...');
    public readonly isDisabled = input<boolean>(false);

    protected readonly isOpen = signal(false);

    protected readonly selectedLabel = computed(() => {
        const selected = this.options().find((o) => o.value === this.value());
        return selected ? selected.label : this.placeholder();
    });

    protected toggle(): void {
        if (this.isDisabled()) return;
        this.isOpen.update((v) => !v);
    }

    protected select(option: DropdownOption): void {
        this.value.set(option.value);
        this.isOpen.set(false);
    }

    @HostListener('document:click', ['$event'])
    protected onClickOutside(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        if (!this.elementRef.nativeElement.contains(target)) {
            this.isOpen.set(false);
        }
    }
}
