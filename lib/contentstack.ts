'use client';

import ContentstackAppSDK from '@contentstack/app-sdk';
import UiLocation from "@contentstack/app-sdk/dist/src/uiLocation";

let sdkInstance: UiLocation | null = null;

export async function initializeContentstackSDK(): Promise<UiLocation> {
  if (typeof window === 'undefined') {
    throw new Error('Contentstack SDK can only be initialized in the browser');
  }

  if (!sdkInstance) {
    sdkInstance = await ContentstackAppSDK.init();

    sdkInstance.location.DashboardWidget?.frame?.disableAutoResizing();
    await sdkInstance.location.CustomField?.frame?.updateHeight?.(450);

    sdkInstance.location.FieldModifierLocation?.frame?.disableAutoResizing();
    await sdkInstance.location.FieldModifierLocation?.frame?.updateDimension({ height: 380, width: 520 });

    sdkInstance.location.DashboardWidget?.frame?.disableAutoResizing();
    await sdkInstance.location.DashboardWidget?.frame?.updateHeight?.(722);
  }

  return sdkInstance;
}

export function getSDKInstance(): UiLocation | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return sdkInstance;
}