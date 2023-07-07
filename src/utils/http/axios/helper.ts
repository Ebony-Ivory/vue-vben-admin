import { isObject, isString } from '/@/utils/is';
import type { UploadFileListParams } from '/#/axios';
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }

  for (const key in params) {
    const format = params[key]?.format ?? null;
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
}

/**
 * @author: yuke.lu
 * @description: Format obj into upload file list model
 * @param {Recordable} data
 */
export function toUploadFileListParams(data: Recordable): UploadFileListParams {
  let res: UploadFileListParams = {
    data: {},
    name: 'defaultFileListFieldName',
    files: [],
  };
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data![key];
      // console.log(key, typeof value, value?.toString());
      if (value?.toString().includes('[object File]')) {
        res.files = value;
        res.name = key;
      } else {
        Object.assign(res.data!, { [key]: value });
      }
    });
  }
  return res;
}
