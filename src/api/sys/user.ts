// import { defHttp } from '/@/utils/http/axios';
import { authHttp } from '/@/utils/http/axios/httpInstance';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uaesDserviceAppId = '' } = useGlobSetting();
enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetSsOPageUserInfo = '/user/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return authHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo 适用于仅认证的接口
 */
export function getUserInfo() {
  return authHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo, params: { appId: uaesDserviceAppId } },
    { errorMessageMode: 'none' },
  );
}

/**
 * @description: getUserInfo 适用于单点登录(页面跳转模式)的获取用户信息的接口
 */
export function getSsOPageUserInfo() {
  return authHttp.get<GetUserInfoModel>(
    { url: Api.GetSsOPageUserInfo, params: { appId: uaesDserviceAppId } },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return authHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return authHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return authHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
