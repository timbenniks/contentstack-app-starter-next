import { useSdkDataByPath } from "./useSdkDataByPath";
import { useAppLocation } from "./useAppLocation";

/**
 * Returns the Iframe instance for the location
 * Works only for CustomField and Dashboard Widgets
 */
export const useFrame = (): null | object | unknown => {
  const { locationName } = useAppLocation();
  const availableFrameLocations: string[] = ["CustomField", "DashboardWidget"];

  if (!availableFrameLocations.includes(locationName)) {
    throw new Error(`useFrame cannot be used at ${locationName} location`);
  }

  const frame = useSdkDataByPath(`location.${locationName}`, null);
  return frame;
};
