import {ChangeDetectionStrategy, Component} from "@angular/core";

@Component({
  template: `
    <h1>404</h1>
    <h2>Page not found</h2>
  `,
  standalone: true,
  styles: [`
    :host { display: block; margin: 0 auto; max-width: 40rem; padding-top: 5rem; padding-bottom: 10rem;}
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error404Component {
}
