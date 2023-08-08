/*
 * 定义运行时变量
 * @Author: yuke.lu
 * @Date: 2023-08-08 09:57:34
 * @FilePath: \vben-base2\src\settings\runtimeVar.ts
 *
 */

export default () => {
  window._env_ = {
    ENV_VARIABLE1: '(init)运行时环境变量1',
    ENV_VARIABLE2: '(init)运行时环境变量2',
    ENV_VARIABLE3: '(init)运行时环境变量3',
  };
};
