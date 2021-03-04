import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  template: `<div class="error" [class.hide]="_hide">{{ _text }}</div>`,
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
  // tslint:disable-next-line:variable-name
  _text: string;
  // tslint:disable-next-line:variable-name
  _hide = true;

  @Input() set text(value) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      // Need to call detectChanges because the strategy is OnPush and in default it will not re-render the view on new input set
      this.cdr.detectChanges();
    }
  }

  constructor(private cdr: ChangeDetectorRef) { }
}
