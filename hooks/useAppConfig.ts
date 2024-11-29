import { useContentstack } from "@/contexts/ContentstackContext";

export const useAppConfig = () => {
  const { appConfig } = useContentstack();
  return appConfig;
};
