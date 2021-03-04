export class Alert {
    message: string;
    alertType: AlertType;
    opened: boolean;

    constructor(message: string, alertType: AlertType, opened: boolean) {
        this.message = message;
        this.alertType = alertType;
        this.opened = opened;
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warn
}
