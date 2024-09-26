import { EnvironmentProviders, Provider } from '@angular/core';
import { FeaturePermissionsPort } from '@demo/feature-common';
import { FeaturePermissions } from './feature-permissions';

export const featurePermissionsProviders: Array<Provider | EnvironmentProviders> = [
  FeaturePermissions,
  {
    provide: FeaturePermissionsPort,
    useClass: FeaturePermissions,
  }
]
