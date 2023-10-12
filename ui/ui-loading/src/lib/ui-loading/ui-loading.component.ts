import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {combineLatestWith, interval, map, of, take} from "rxjs";

@Component({
  selector: 'ui-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible$ | async" class="ui-loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`,
  styleUrls: ['./ui-loading.component.scss'],
})
export class UiLoadingComponent {
  readonly isVisible$ = of(false).pipe(
    combineLatestWith(interval(300).pipe(take(1))),
    map(() => true),
  );
}
