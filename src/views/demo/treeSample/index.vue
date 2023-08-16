<!--
 * @Author: yuke.lu
 * @Date: 2023-08-15 13:55:18
 * @FilePath: \vben-base2\src\views\demo\treeSample\index.vue
 * 
-->
<template>
  <Row :gutter="[16, 16]">
    <Col :span="8">
      <BasicTree
        title="可勾选，默认全部展开"
        :treeData="treeData"
        :checkable="true"
        defaultExpandAll
        @check="handleCheck"
      />
    </Col>
    <Col :span="8">
      <BasicTree
        title="指定默认展开/勾选示例"
        :treeData="treeData"
        :checkable="true"
        :expandedKeys="['0-0']"
        :checkedKeys="['0-0']"
      />
    </Col>
    <Col :span="8">
      <Card title="异步数据，默认展开">
        <template #extra>
          <a-button @click="loadTreeData" :loading="treeLoading">加载数据</a-button>
        </template>
        <Spin :spinning="treeLoading">
          <BasicTree ref="asyncExpandTreeRef" :treeData="tree2" />
        </Spin>
      </Card>
    </Col>
  </Row>
</template>
<script lang="ts" setup>
  import { nextTick, ref, unref } from 'vue';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree/index';
  import { treeData } from './data';
  import { Card, Row, Col, Spin } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  import { type Nullable } from '@vben/types';

  const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
  const tree2 = ref<TreeItem[]>([]);
  const treeLoading = ref(false);

  function handleCheck(checkedKeys, e) {
    console.log('onChecked', checkedKeys, e);
  }

  function loadTreeData() {
    treeLoading.value = true;
    // 以下是模拟异步获取数据
    setTimeout(() => {
      // 设置数据源
      tree2.value = cloneDeep(treeData);
      treeLoading.value = false;
      // 展开全部
      nextTick(() => {
        console.log(unref(asyncExpandTreeRef));
        unref(asyncExpandTreeRef)?.expandAll(true);
      });
    }, 2000);
  }
</script>
