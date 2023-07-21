import { useGlobSetting } from '/@/hooks/setting';
import { buildUUID } from '/@/utils/uuid';
import { dateUtil } from '/@/utils/dateUtil';
import { encryptByMd5, encryptByBase64, decodeByBase64 } from '/@/utils/cipher';
import type { RouteLocationNormalized } from 'vue-router';
// import { useUserStoreWithOut } from '/@/store/modules/user';
// import { PageEnum } from '/@/enums/pageEnum';

/*
1)	准备的8个参数及示范内容：
string RequestID="01e60a6b78e549e39d8c1b2d10e2dafa";
string AppID="d-Service-DemoApp";
string AppKey="9df43c00e3dac026c2363e9ed7742f38";
long TimeStamp=1616703643886;
string Redirect="http://www.coming-tek.com/tools/ip.html";
string ParameterName="data";
string CustomValue="login=1&page=/html/b.htm";
string VerifyCode="d83bd8afedb8442e82c9be223ff06108";
参数说明
RequestID	随机的Guid，不包含-号
AppID	由单点登录服务分配
AppKey	由单点登录服务分配
TimeStamp	当前时间距1970年1月1日之间的毫秒数，与JavaScript里面的getTime相同
Redirect 	登录成功后跳转到的页面地址
ParameterName	登录成功后跳转到的页面地址中，附带的加密信息参数名称，如data、data1。
CustomValue	登录成功后跳转到的地址附加到跳转页面的加密信息参数名称
VerifyCode	取值公式：
MD5("AppKey#RequestID#AppID#TimeStamp#Redirect#ParameterName
#CustomValue".ToLower()).ToLower();校验码字符串必须转小写后再md5加密，加密取小写格式的值


2)	将这些变量组合成以下JSON格式
{
    "RequestID":"01e60a6b78e549e39d8c1b2d10e2dafa",
    "AppID":"d-Service-DemoApp",
    "AppKey":"232fewfwefwewe",
    "TimeStamp":1616703643886,
    "Redirect":"http://www.baidu.com/test",
    "ParameterName":"data",
    "CustomValue":"login=1&page=/html/b.htm",
    "VerifyCode":"d83bd8afedb8442e82c9be223ff06108"
}
3)	将JSON字符串进行Base64编码后就是加密的内容
例如：
eyJSZXF1ZXN0SUQiOiIyMGU3ZGQwN2I1Y2E0ZmIyYjM2ODQzZTA2ODBhNGQxNyIsIkFwcElEIjoiZC1mYW1zIiwiUGFyYW1ldGVyTmFtZSI6ImRhdGEiLCJSZWRpcmVjdCI6Imh0dHA6Ly93d3cuY29taW5nLXRlay5jb20vdG9vbHMvaXAuaHRtbCIsIlRpbWVTdGFtcCI6MTYxNjcwMzY0Mzg4NiwiVmVyaWZ5Q29kZSI6ImQ4M2JkOGFmZWRiODQ0MmU4MmM5YmUyMjNmZjA2MTA4IiwiQ3VzdG9tVmFsdWUiOiJsb2dpbj0xXHUwMDI2cGFnZT0vaHRtbC9iLmh0bSJ9

*/

const globSetting = useGlobSetting();
const payLoadField = 'dserviceAuthorizePayloadField';
const dserviceOauth2Url = 'http://oauth2.prod.aliyun.dservice.uaes.com/connect/oauth2';
// const dserviceOauth2Url = 'http://oauth2.dev.dservice.uaes.com/connect/oauth2';
const appId = globSetting.uaesDserviceAppId || '';
// const LOGIN_PATH = PageEnum.BASE_LOGIN;
const appKey = globSetting.uaesDserviceAppProdKey;
// const userStore = useUserStoreWithOut();
//全局参数
export const useSsoLoginPage = globSetting.uaesSsoPage;
//按照dservice文档拼接登录地址和参数
export function toUaesDserviceLoginPage(to: RouteLocationNormalized) {
  debugger;
  console.log("🚀 🟩 toUaesDserviceLoginPage 🟩 to=>", to)
  window.location.href = `${dserviceOauth2Url}/authorize?data=${genBase64ParamStr()}`;
}

export function getPayload(rawStr: string) {
  return decodePayload(rawStr);
}

//暂定,需要等供应商升级后确定
export function getPayloadRawStr(to: RouteLocationNormalized, searchStr: string): string | null {
  let searchParams = new URLSearchParams(searchStr);
  if (to.query?.[payLoadField]) {
    return to.query?.[payLoadField] as string;
  }
  return payloadRawStrInSearchParams(searchParams);
}

//暂定,需要等供应商升级后确定
function payloadRawStrInSearchParams(searchParams: URLSearchParams): string | null {
  try {
    for (let p of searchParams.entries()) {
      if (p[0].toString() == payLoadField) {
        return p[1];
      }
    }
    return null;
  } catch (e) {
    console.error('payloadRawStrInSearchParams error', e);
    return null;
  }
}

export function decodePayload(rawStr: string): PayloadModel {
  try {
    let payload = JSON.parse(decodeByBase64(rawStr));

    if (payload.VerifyCode != getResVerifyCode(payload)) {
      throw new Error(`Invalid res VerifyCode in payload=>${rawStr}`);
    }

    //+20min
    let t1 = dateUtil(payload.TimeStamp).add(20, 'minutes').valueOf();
    payload.TimeStamp = t1;
    return payload;
  } catch (e) {
    console.error('Payload decode error', e);
    throw new Error('Payload decode error');
  }
}

export function clearSsoHref() {
  let searchStr = window.location.search;
  window.location.href = window.location.href.replace(`${searchStr}`, '');
}



function genBase64ParamStr(): string {
  let requestId = buildUUID();

  let timeStamp = dateUtil().valueOf();
  // let redirect = `${window.location.origin}/#/login`;
  let redirect = `${window.location.href}`;
  let parameterName = payLoadField;
  let customValue = 'poweredbywxptef4dot0group';

  let queryObj: SsoQueryObjectModel = {
    RequestID: requestId,
    AppID: appId,
    AppKey: appKey,
    TimeStamp: timeStamp,
    Redirect: redirect,
    ParameterName: parameterName,
    CustomValue: customValue,
    VerifyCode: '',
  };
  queryObj.VerifyCode = getReqVerifyCode(queryObj);

  //json化
  let queryParamJson = JSON.stringify(queryObj);
  console.log('🚀 🟩 genBase64ParamStr 🟩 queryObj=>', queryObj);
  return encryptByBase64(queryParamJson);
}

function getReqVerifyCode(obj: SsoQueryObjectModel): string {
  return encryptByMd5(
    `${obj.AppKey}#${obj.RequestID}#${obj.AppID}#${obj.TimeStamp}#${obj.Redirect}#${obj.ParameterName}#${obj.CustomValue}`.toLowerCase(),
  ).toLowerCase();
}

function getResVerifyCode(obj: PayloadModel): string {
  return encryptByMd5(
    `${obj.RequestID}#${obj.AppID}#${appKey}#${obj.TimeStamp}#${obj.AccessToken}#${obj.Account}#${obj.Name}#${obj.Department}#${obj.CustomValue}`.toLowerCase(),
  ).toLowerCase();
}

// 参数说明
// RequestID	随机的Guid，不包含-号
// AppID	由单点登录服务分配
// AppKey	由单点登录服务分配
// TimeStamp	当前时间距1970年1月1日之间的毫秒数，与JavaScript里面的getTime相同
// Redirect 	登录成功后跳转到的页面地址
// ParameterName	登录成功后跳转到的页面地址中，附带的加密信息参数名称，如data、data1。
// CustomValue	登录成功后跳转到的地址附加到跳转页面的加密信息参数名称
// VerifyCode	取值公式：
// MD5("AppKey#RequestID#AppID#TimeStamp#Redirect#ParameterName
// #CustomValue".ToLower()).ToLower();校验码字符串必须转小写后再md5加密，加密取小写格式的值
interface SsoQueryObjectModel {
  RequestID: string;
  AppID: string;
  AppKey: string;
  TimeStamp: number;
  Redirect: string;
  ParameterName: string;
  CustomValue: string;
  VerifyCode: string;
}

export interface PayloadModel {
  RequestID?: string;
  AppID?: string;
  Account?: string;
  Department?: string;
  Name?: string;
  TimeStamp?: number;
  CustomValue?: string;
  AccessToken?: string;
  VerifyCode?: string;
}
