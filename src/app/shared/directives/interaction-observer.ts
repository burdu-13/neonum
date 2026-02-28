import { Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
    selector: '[appInteractionObserver]',
})
export class InteractionObserver {
    private readonly element = inject(ElementRef);

    public readonly isIntersecting = output<void>();

    private observer?: IntersectionObserver;

    public ngOnInit(): void {
        this.observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    this.isIntersecting.emit();
                }
            },
            {
                rootMargin: '200px',
                threshold: 0.1,
            },
        );

        this.observer.observe(this.element.nativeElement);
    }

    public ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
