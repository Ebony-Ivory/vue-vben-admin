<template>
  <div>
    <Button class="m-2" type="primary" @click="delayTime"> Delay </Button>
    <span>{{ msgRef }}</span>
  </div>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import { ref } from 'vue';
  import { viewUaesFrontTimeout } from '/@/utils/http/axios/frontTimeout';
  let msgRef = ref();
  function delayTime() {
    msgRef.value = viewUaesFrontTimeout();
  }
</script>
