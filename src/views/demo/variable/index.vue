<template>
  <div>
    <div>{{ '=======================' }} </div>
    <div>{{ v1 }} </div>
    <div>{{ v2 }} </div>
    <div>{{ '=======================' }} </div>
  </div>
</template>
<script lang="ts" setup>
  import { getC7nEnvVar } from '/@/utils/uaes';
  let v1 = getC7nEnvVar(window._env_.ENV_VARIABLE1, 'dev mode:v1');
  let v2 = getC7nEnvVar(window._env_.ENV_VARIABLE2, 'dev mode:v2');
</script>
<style lang="less" scoped></style>
