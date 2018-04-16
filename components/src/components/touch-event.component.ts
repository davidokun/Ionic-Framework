import {Component} from "@angular/core";

@Component({
  selector: 'app-touch-event',
  template: `
    <div class="gestures" (click)="onElementClick()">
      Click me
    </div>

    <div class="gestures" (tap)="onElementTap()">
      Tap me
    </div>

    <div class="gestures" (press)="onElementPress()">
      Long press me
    </div>
  `
})
export class TouchEventComponent {

  onElementClick() {
    console.log('I was click or tocuhed');
  }

  onElementTap() {
    console.log('I was tapped');
  }

  onElementPress() {
    console.log('I was long pressed');
  }
}
