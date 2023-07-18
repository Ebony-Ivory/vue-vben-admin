<template>
  <div>
    <label>页面内3个按钮</label><br />
    <!-- 匹配任意一个即可 -->
    <Authority :value="['defaultValue']">
      <Button class="m-1" type="primary"> 鉴权按钮1 </Button>
    </Authority>

    <Authority :value="['xxxxxxxxxxxxx']">
      <Button class="m-1" type="primary"> 鉴权按钮2 </Button>
    </Authority>

    <Authority :value="['xxxxxxxxxxxxx', 'defaultValue']">
      <Button class="m-1" type="primary"> 鉴权按钮3 </Button>
    </Authority>
  </div>
</template>
<script lang="ts" setup>
  import { Authority } from '/@/components/Authority';
  import { Button } from 'ant-design-vue';
</script>
<style lang="less" scoped></style>
