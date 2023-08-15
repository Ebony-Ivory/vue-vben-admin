<template>
  <TreeSelect
    class="!m-4 w-3/10"
    v-model:value="value"
    :tree-data="treeData"
    tree-checkable
    allow-clear
    :show-checked-strategy="SHOW_PARENT"
    placeholder="Please select"
    tree-node-filter-prop="label"
  />
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import type { TreeSelectProps } from 'ant-design-vue';
  import { TreeSelect } from 'ant-design-vue';
  const SHOW_PARENT = TreeSelect.SHOW_PARENT;

  const treeData: TreeSelectProps['treeData'] = [
    {
      label: '1-label',
      value: '1-value',
      children: [
        {
          label: '1-1-label',
          value: '1-1-value',
        },
        {
          label: '1-2-label',
          value: '1-2-value',
        },
      ],
    },
    {
      label: '2-label',
      value: '2-value',

      children: [
        {
          label: '2-1-label',
          value: '2-1-value',
          disabled: true,
        },
        {
          label: '2-2-label',
          value: '2-2-value',
        },
        {
          label: '2-3-label',
          value: '2-3-value',
        },
      ],
    },
  ];

  const value = ref<string[]>(['2-2-value']);

  watch(value, () => {
    console.log(value.value);
  });
</script>
