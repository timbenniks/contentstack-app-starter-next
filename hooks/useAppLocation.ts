import type { LocationType } from "@contentstack/app-sdk/dist/src/types";
import { useAppSdk } from "./useAppSdk";

type AppSdkLocation = {
  [K in LocationType]?: string | null;
};

interface AppSdk {
  location?: AppSdkLocation;
}

/**
 * Returns the location name (eg: CustomField) and the location instance from the SDK
 * based on active location
 * @return { locationName, location }
 */
export const useAppLocation = () => {
  const sdk = useAppSdk() as AppSdk;
  const locations = sdk?.location && (Object.keys(sdk.location) as LocationType[]);

  let location = {};
  let locationName = "";

  if (!locations || !sdk?.location) {
    return { location, locationName };
  }

  for (const loc of locations) {
    const typedLoc = loc as LocationType;
    if (typedLoc in sdk.location &&
      sdk.location[typedLoc] !== undefined &&
      sdk.location[typedLoc] !== null &&
      sdk.location[typedLoc] !== "") {
      locationName = typedLoc;
      location = sdk.location[typedLoc];
      break;
    }
  }

  return { location, locationName };
}