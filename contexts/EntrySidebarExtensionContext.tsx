import React, { useEffect, useState } from "react";
import { useAppLocation } from "../hooks/useAppLocation";

export type ChildProp = {
  children: string | JSX.Element | JSX.Element[];
};

export type EntrySidebarExtensionContextType = {
  entryData: { [key: string]: unknown };
  loading: boolean;
};

export const EntrySidebarExtensionContext =
  React.createContext<EntrySidebarExtensionContextType>({
    entryData: {},
    loading: false,
  });

export const EntrySidebarExtensionProvider = ({ children }: ChildProp) => {
  const [entryData, setEntry] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const { location } = useAppLocation();

  useEffect(() => {
    (async () => {
      if (Object.keys(entryData).length > 0 || location === null) {
        return false;
      }

      setLoading(true);

      if ("entry" in location) {
        const entry: { [key: string]: unknown } | undefined =
          location?.entry?.getData();

        setEntry(entry);
      }

      setLoading(false);
    })();
  }, [entryData, location, setLoading, setEntry]);

  return (
    <EntrySidebarExtensionContext.Provider value={{ entryData, loading }}>
      {children}
    </EntrySidebarExtensionContext.Provider>
  );
};
