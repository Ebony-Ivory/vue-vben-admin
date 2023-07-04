import { createAxios } from './index';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting = useGlobSetting();

//tableau票证获取服务
export const tableauHttp = createAxios({
  requestOptions: {
    apiUrl: 'http://174.35.64.19:8080/ascp-spring-back-ticket',
  },
});

// WxP Demo用上传文件接口
export const uploadServiceHttp = createAxios({
  requestOptions: {
    apiUrl: 'http://localhost:8080',
  },
});

// WxP Demo用下载文件接口
export const downloadServiceHttp = createAxios({
  requestOptions: {
    apiUrl: 'http://localhost:8080',
  },
});

//WxP SSO服务
export const authHttp = (() => {
  if (globSetting?.uaesDomainLogin) {
    return createAxios({
      requestOptions: {
        apiUrl: 'http://sso-be.wxp.dev.dservice.uaes.com',
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
