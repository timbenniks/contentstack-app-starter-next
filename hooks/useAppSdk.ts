import { useContentstack } from "@/contexts/ContentstackContext";

export const useAppSdk = () => {
  const { sdk } = useContentstack();
  return sdk;
};
