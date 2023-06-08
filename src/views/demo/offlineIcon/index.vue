<template>
  <div class="icon-group common-flex flex-wrap">
    <template v-for="_obj in Array(100)">
      <div class="border-dev common-flex">
        <div :class="pickIcon()" class="text-50px" ></div>
      </div>
  
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { Random } from 'mockjs';
  import { ref } from 'vue';
  const loading = ref(true);
  function pickIcon() {
    return Random.pick([
      'i-ant-design:wechat-outlined',
      'i-ant-design:qq-circle-filled',
      'i-ant-design:twitter-circle-filled',
    ]);
  }
  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
<style lang="less" scoped>
  .icon-group {
    &>div {
      @apply w-100px h-100px;
    }
  }
</style>
