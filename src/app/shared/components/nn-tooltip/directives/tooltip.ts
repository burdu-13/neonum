import {
    ApplicationRef,
    ComponentRef,
    createComponent,
    Directive,
    ElementRef,
    EnvironmentInjector,
    HostListener,
    inject,
    input,
    OnDestroy,
} from '@angular/core';
import { NnTooltip } from '../nn-tooltip';

@Directive({
    selector: '[nnTooltip]',
})
export class NnTooltipDirective implements OnDestroy {
    public readonly nnTooltip = input.required<string>();

    private readonly elementRef = inject(ElementRef);
    private readonly appRef = inject(ApplicationRef);
    private readonly injector = inject(EnvironmentInjector);

    private componentRef: ComponentRef<NnTooltip> | null = null;
    private showTimeout: any;

    @HostListener('mouseenter')
    public onMouseEnter(): void {
        if (this.componentRef) return;
        this.showTimeout = setTimeout(() => this.showTooltip(), 200);
    }

    @HostListener('mouseleave')
    public onMouseLeave(): void {
        clearTimeout(this.showTimeout);
        this.hideTooltip();
    }

    private showTooltip(): void {
        this.componentRef = createComponent(NnTooltip, {
            environmentInjector: this.injector,
        });

        this.componentRef.instance.text.set(this.nnTooltip());
        document.body.appendChild(this.componentRef.location.nativeElement);
        this.appRef.attachView(this.componentRef.hostView);

        const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
        let left = hostRect.left + hostRect.width / 2;
        const top = hostRect.bottom + 8;

        this.componentRef.instance.left.set(left);
        this.componentRef.instance.top.set(top);

        setTimeout(() => {
            if (!this.componentRef) return;

            const tooltipEl = this.componentRef.location.nativeElement.querySelector('.nn-tooltip');
            if (tooltipEl) {
                const tooltipRect = tooltipEl.getBoundingClientRect();
                const padding = 12;

                if (left + tooltipRect.width / 2 > window.innerWidth - padding) {
                    left = window.innerWidth - tooltipRect.width / 2 - padding;
                }
                if (left - tooltipRect.width / 2 < padding) {
                    left = tooltipRect.width / 2 + padding;
                }

                this.componentRef.instance.left.set(left);
            }

            this.componentRef.instance.isVisible.set(true);
        }, 0);
    }

    private hideTooltip(): void {
        if (!this.componentRef) return;

        this.componentRef.instance.isVisible.set(false);
        const ref = this.componentRef;
        this.componentRef = null;

        setTimeout(() => {
            this.appRef.detachView(ref.hostView);
            ref.destroy();
        }, 200);
    }

    public ngOnDestroy(): void {
        clearTimeout(this.showTimeout);
        if (this.componentRef) {
            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}
