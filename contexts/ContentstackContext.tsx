"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import UiLocation from "@contentstack/app-sdk/dist/src/uiLocation";
import { initializeContentstackSDK } from "@/lib/contentstack";

interface KeyValueObj {
  [key: string]: string;
}

interface ContentstackContextType {
  sdk: UiLocation | null;
  isInitialized: boolean;
  error: Error | null;
  appConfig: KeyValueObj | null;
}

export const ContentstackContext = createContext<ContentstackContextType>({
  sdk: null,
  isInitialized: false,
  error: null,
  appConfig: null,
});

export function ContentstackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sdk, setSDK] = useState<UiLocation | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [appConfig, setAppConfig] = useState<KeyValueObj | null>(null);

  useEffect(() => {
    const initSDK = async () => {
      try {
        const sdkInstance = await initializeContentstackSDK();
        setSDK(sdkInstance);

        const appConfig = await sdkInstance.getConfig();
        setAppConfig(appConfig);

        setIsInitialized(true);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to initialize Contentstack SDK")
        );
        setIsInitialized(true);
      }
    };

    if (typeof window !== "undefined") {
      initSDK();
    }
  }, []);

  return (
    <ContentstackContext.Provider
      value={{ sdk, appConfig, isInitialized, error }}
    >
      {children}
    </ContentstackContext.Provider>
  );
}

export function useContentstack() {
  const context = useContext(ContentstackContext);
  if (context === undefined) {
    throw new Error(
      "useContentstack must be used within a ContentstackProvider"
    );
  }

  return context;
}
