import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiLoadingComponent } from '@demo/ui/ui-loading';
import { UiLoadedContent } from './ui-loaded-content.interface';

@Component({
  selector: 'ui-loaded-content',
  standalone: true,
  imports: [CommonModule, UiLoadingComponent],
  templateUrl: './ui-loaded-content.component.html',
  styleUrls: ['./ui-loaded-content.component.scss'],
})
export class UiLoadedContentComponent {
  @Input({ required: true }) content!: UiLoadedContent;
}
