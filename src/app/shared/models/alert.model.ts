export type AlertType = 'success' | 'error' | 'info';

export interface Alert {
    message: string;
    type: AlertType;
}
