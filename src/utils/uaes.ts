import { isDevMode } from '/@/utils/env';

//根据启动模式选择环境
export function getC7nEnvVar(envVar: string, devModeStr: string): string {
  return isDevMode() ? devModeStr : envVar;
}
