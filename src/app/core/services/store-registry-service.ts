import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StoreRegistryService {
    private readonly resetCallbacks = new Set<() => void>();

    public register(resetFn: () => void): void {
        this.resetCallbacks.add(resetFn);
    }

    public unregister(resetFn: () => void): void {
        this.resetCallbacks.delete(resetFn);
    }

    public resetAllStores(): void {
        this.resetCallbacks.forEach((reset) => reset());
    }
}
