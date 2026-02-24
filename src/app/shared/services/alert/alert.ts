import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertType, Alert } from '../../models/alert.model';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private readonly alertSubject = new BehaviorSubject<Alert | null>(null);
    public readonly alert$ = this.alertSubject.asObservable();

    public showAlert(message: string, type: AlertType = 'info'): void {
        this.alertSubject.next({ message, type });

        setTimeout(() => this.clear(), 5000);
    }

    public clear(): void {
        this.alertSubject.next(null);
    }
}
