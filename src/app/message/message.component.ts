import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <small class="p-error" *ngIf="temErro()">{{ text }}</small>
  `,
  styles: []
})
export class MessageComponent {

  @Input()
  error!: string;
  @Input()
  control!: any;
  @Input()
  text!: string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
