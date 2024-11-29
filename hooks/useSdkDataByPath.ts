import { useAppSdk } from "./useAppSdk";

/**
 * useSdkDataByPath
 * This is a generic hook which can return the value at the given path;
 * @param path
 * @param defaultValue
 *
 * eg:
 * const contentTypeUuid = useSdkDataByPath('location.SidebarWidget.entry.content_type.uid', '')
 * const stackKey =  useSdkDataByPath('stack._data.api_key', '');
 */
export const useSdkDataByPath = (path: string, defaultValue: unknown): unknown => {
  const appSdk = useAppSdk();

  const pathArray = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = appSdk;

  for (const key of pathArray) {
    if (result == null || typeof result !== 'object') {
      return defaultValue;
    }

    result = result[key];
  }

  return result === undefined ? defaultValue : result;

};
