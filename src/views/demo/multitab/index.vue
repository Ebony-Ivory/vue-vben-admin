<template>
  <div class="card-container">
    <Tabs v-model:activeKey="activeKeyA" type="card">
      <TabPane :key="1" tab="aaa">aaaaa </TabPane>
      <TabPane :key="2" tab="bbb">bbbbb </TabPane>
    </Tabs>
  </div>
</template>
<script lang="ts" setup>
  import { Tabs, TabPane } from 'ant-design-vue';
  import { ref } from 'vue';
  let activeKeyA = ref(1);
</script>
<style lang="less" scoped>
  .card-container {
    @apply m-2;

    margin: 0;
    :deep(.ant-tabs-top > .ant-tabs-nav) {
      margin: 0;

      .ant-tabs-nav-wrap > .ant-tabs-nav-list {
        @apply !w-full;

        .ant-tabs-tab {
          @apply !w-1/2 mx-10 !text-xl  !justify-center;
        }
      }
    }

    :deep(.ant-tabs-card) {
      #components-tabs-demo-card-top .code-box-demo {
        padding: 24px;
        overflow: hidden;
        background: #f5f5f5;
      }
      .ant-tabs-nav::before {
        display: none;
      }

      .ant-tabs-tabpane {
        padding: 16px;
        background: #fff;
      }
    }
  }
</style>
