import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { FeaturePermissionsPort } from '@demo/feature-common';

export const loadPermissionsGuard: CanMatchFn = () => {
  inject(FeaturePermissionsPort).load();
  return true;
}
