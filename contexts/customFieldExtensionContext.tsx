import React, { useCallback, useEffect, useState } from "react";
import { useAppLocation } from "../hooks/useAppLocation";

export type ChildProp = {
  children: string | JSX.Element | JSX.Element[];
};

export type CustomFieldExtensionContextType = {
  customField: unknown;
  setFieldData: (data: unknown) => void;
  loading: boolean;
};

export const CustomFieldExtensionContext =
  React.createContext<CustomFieldExtensionContextType>({
    customField: null,
    setFieldData: () => ({}),
    loading: false,
  });

export const CustomFieldExtensionProvider = ({ children }: ChildProp) => {
  const [customField, setCustomField] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { location } = useAppLocation();

  useEffect(() => {
    (async () => {
      // check if the data was loaded earlier or not
      if (!customField && location && "field" in location) {
        setLoading(true);
        const fieldData = await location?.field.getData();
        setCustomField(fieldData);
        setLoading(false);
      }
    })();
  }, [setLoading, setCustomField, location, customField]);

  const setFieldData = useCallback(
    async (data: unknown) => {
      setLoading(true);
      if (location && "field" in location) {
        location?.field.setData(data);
      }
      setCustomField(data);
      setLoading(false);
    },
    [location, setLoading, setCustomField]
  );

  return (
    <CustomFieldExtensionContext.Provider
      value={{ customField, setFieldData, loading }}
    >
      {children}
    </CustomFieldExtensionContext.Provider>
  );
};
