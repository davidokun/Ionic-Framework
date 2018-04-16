import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-reset',
  templateUrl: 'reset.html'
})
export class ResetComponent {

  @Output()
  didReset = new EventEmitter<string>();

  constructor() {}

  onReset(type: string) {
    this.didReset.emit(type);
  }

}
