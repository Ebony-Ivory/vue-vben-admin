import { createAxios } from './index';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting = useGlobSetting();

//tableau票证获取服务
export const tableauHttp = createAxios({
  requestOptions: {
    apiUrl: 'http://174.35.64.19:8080/ascp-spring-back-ticket',
  },
});

//WxP SSO服务
export const authHttp = (() => {
  if (globSetting?.uaesDomainLogin) {
    return createAxios({
      requestOptions: {
        apiUrl: 'http://174.35.64.19:8080/sso-spring-back',
      },
    });
  } else {
    return createAxios({
      requestOptions: {
        //mock
        apiUrl: '/basic-api',
      },
    });
  }
})();


