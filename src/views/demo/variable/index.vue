<template>
  <div>{{ envVar.ENV_VARIABLE1 }} </div>
  <div>{{ envVar.ENV_VARIABLE2 }} </div>
  <div>{{ envVar.ENV_VARIABLE3 }} </div>
</template>
<script lang="ts" setup>
  let envVar = window._env_;
</script>
<style lang="less" scoped></style>
