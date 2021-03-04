import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert, AlertType } from '../../components/global/alert/alert.model';


@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<Alert>();

    constructor() { }

    async info(message: string) {
        this.alert(AlertType.Info, message);
    }

    async success(message: string) {
        this.alert(AlertType.Success, message);
    }

    async error(message: string) {
        this.alert(AlertType.Error, message);
    }

    async warn(message: string) {
        this.alert(AlertType.Warn, message);
    }

    // Alert component is subscribing to this observable
    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    // Clear alerts, sending null alert
    clear(): void {
        this.subject.next();
    }

    private alert(type: AlertType, message: string) {
        this.subject.next({ message, alertType: type, opened: true } as Alert);
    }
}
