/*
 * @Author: yuke.lu
 * @Date: 2023-11-08 16:00:15
 * @FilePath: \vben-base2\src\utils\http\axios\frontTimeout.ts
 * 前端超时控制方法
 */
import { createLocalStorage } from '/@/utils/cache';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { dateUtil } from '/@/utils/dateUtil';
const FRONT_TIMEOUT_KEY = 'UAES_FRONT_TIMEOUT';
const EXPIRE_TIME = 30 * 60; //单位秒

export function judgeUaesFrontTimeout(config) {
  const userStore = useUserStoreWithOut();
  const ls = createLocalStorage();
  let timeoutData = ls.get(FRONT_TIMEOUT_KEY);
  if (config.url.includes('/login') || config.url.includes('/logout') || timeoutData != null) {
    console.log('刷新了超时时间');
    ls.set(FRONT_TIMEOUT_KEY, 'out of time', EXPIRE_TIME);
  } else {
    console.log('长期未请求,判定为超时');
    userStore.setToken(undefined);
    userStore.logout(true);
  }
}

export function viewUaesFrontTimeout() {
  const ls = createLocalStorage();
  let { value, expire, time } = ls.view(FRONT_TIMEOUT_KEY);
  let formatStr = 'YYYY-MM-DD HH:mm:ss.SSS';
  return {
    value,
    expire: dateUtil(expire).format(formatStr),
    time: dateUtil(time).format(formatStr),
  };
}
