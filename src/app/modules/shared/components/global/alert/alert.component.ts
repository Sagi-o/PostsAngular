import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AlertService } from '../../../services/global/alert.service';
import { AlertType, Alert } from './alert.model';
import { UtilsService } from '../../../services/global/utils.service';
import { listAnimationFast } from '../../../animations/list.animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [listAnimationFast],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {
  readonly SECS_SHOWN = 5.2;

  alerts: Alert[] = [];

  subscription = new Subscription();

  constructor(private alertService: AlertService, private utilsService: UtilsService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe((alert: Alert) => {
      this.show(alert);
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async show(alert: Alert) {
    this.alerts.push(alert);
    await this.utilsService.sleep(this.SECS_SHOWN * 1000);
    this.close(alert);
    await this.utilsService.sleep(1000);
    this.alerts.shift();
  }

  close(alert: Alert): void {
    alert.opened = false;
    this.cd.markForCheck();
  }

  cssClass(alertType: AlertType) {
    switch (alertType) {
      case AlertType.Success:
        return 'success';
      case AlertType.Error:
        return 'error';
      case AlertType.Info:
        return 'info';
      case AlertType.Warn:
        return 'warn';
    }
  }
}
