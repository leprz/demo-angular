import { Component } from '@angular/core';
import { FeaturePermissionsPort } from '../feature-permissions.port';

@Component({
  selector: 'feature-permissions',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `,
})
export class FeaturePermissionsComponent {
  permissions$ = this.featurePermissions.permissions$;
  constructor(private readonly featurePermissions: FeaturePermissionsPort) {
  }
}
