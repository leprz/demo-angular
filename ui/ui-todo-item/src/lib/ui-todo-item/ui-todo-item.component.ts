import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTodoItem } from './ui-todo-item.interface';
import { RouterLink } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ui-todo-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ui-todo-item.component.html',
  styleUrls: ['./ui-todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOutAnimation', [
      state(
        'out',
        style({
          height: '1rem',
          opacity: '.5',
        })
      ),
      state(
        'in',
        style({
          height: '3rem',
          opacity: '1',
        })
      ),
      transition('out => in', [animate('.1s')]),
      transition('in => out', [animate('.1s')]),
    ]),
  ],
})
export class UiTodoItemComponent {
  readonly todo = input.required<UiTodoItem>();
  readonly fade = input<boolean>(false);
  isContainerOnly = input<boolean>(false);
}
