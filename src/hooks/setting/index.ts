import type { GlobConfig } from '/#/config';

import { getAppEnvConfig } from '/@/utils/env';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
    VITE_GLOB_UAES_DOMAIN_LOGIN,
    VITE_GLOB_UAES_SSO_PAGE,
    VITE_GLOB_UAES_DSERVICE_APP_ID,
    VITE_GLOB_UAES_DSERVICE_APP_DEV_KEY,
    VITE_GLOB_UAES_DSERVICE_APP_PROD_KEY
  } = getAppEnvConfig();

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_TITLE.replace(/\s/g, '_').replace(/-/g, '_'),
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
    uaesDomainLogin: JSON.parse(VITE_GLOB_UAES_DOMAIN_LOGIN),
    uaesSsoPage: JSON.parse(VITE_GLOB_UAES_SSO_PAGE),
    uaesDserviceAppId: VITE_GLOB_UAES_DSERVICE_APP_ID,
    uaesDserviceAppDevKey: VITE_GLOB_UAES_DSERVICE_APP_DEV_KEY,
    uaesDserviceAppProdKey: VITE_GLOB_UAES_DSERVICE_APP_PROD_KEY
  };
  return glob as Readonly<GlobConfig>;
};
