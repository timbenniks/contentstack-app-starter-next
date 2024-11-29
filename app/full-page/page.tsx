"use client";

import { useContentstack } from "@/contexts/ContentstackContext";
import { useAppLocation } from "@/hooks/useAppLocation";

export default function Home() {
  const { sdk, isInitialized, appConfig, error } = useContentstack();

  console.log({ sdk, isInitialized, appConfig, error });

  const { locationName, location } = useAppLocation();

  console.log({ locationName, location });

  return <main>{locationName}</main>;
}
