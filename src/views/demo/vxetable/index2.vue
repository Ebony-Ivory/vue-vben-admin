<template>
  <PageWrapper title="VxeTable原生" content="WxP测试用" contentFullHeight fixedHeight>
    <VxeButton class="mb-1" content="新增一行" @click="addRow"></VxeButton>
    <VxeButton class="mb-1" content="删除一行" @click="delRow"></VxeButton>
    <VxeButton class="mb-1" content="合并格子" @click="mergeCell"></VxeButton>
    <VxeTable
      :border="true"
      :showFooter="true"
      ref="vtRef"
      :data="tableConfig.data"
      :merge-cells="tableConfig.mergeCells"
      :align="'center'"
      :footer-method="footerMethod1"
    >
      <VxeColumn type="seq" width="60"></VxeColumn>
      <VxeColumn field="name" title="Name"> </VxeColumn>
      <VxeColumn field="sex" title="Sex"></VxeColumn>
      <VxeColumn field="age" title="Age"></VxeColumn>
      <VxeColumn field="role" title="Role"></VxeColumn>
      <VxeColumn field="address" title="Address"></VxeColumn>
    </VxeTable>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, ref, reactive } from 'vue';
  import {
    VxeTable,
    VxeButton,
    VxeColumn,
    VxeTableInstance,
    VxeTableProps,
    VxeTablePropTypes,
  } from 'vxe-table';

  interface UserVO {
    id: number;
    name: string;
    role: string;
    sex: string;
    age: number;
    address: string;
  }

  const footerMethod1: VxeTablePropTypes.FooterMethod = () => {
    // 返回一个二维数组的表尾合计
    return [
      ['合计', '2', '44', '67', '-', '-', '-'],
      ['平均', '2', '44', '67', '-', '-', '-'],
      ['最大', '2', '44', '67', '-', '-', '-'],
      ['最小', '2', '44', '67', '-', '-', '-'],
    ];
  };

  const tableConfig = reactive<VxeTableProps>({
    data: genData(5),
    mergeCells: [],
  });

  function genData(cnt: number): UserVO[] {
    let res: UserVO[] = [];
    for (let index = 0; index < cnt; index++) {
      res.push({
        id: index + 1,
        name: `name${index + 1}`,
        role: `role${index + 1}`,
        sex: `sex${index + 1}`,
        age: index + 18,
        address: `address${index + 1}`,
      });
    }
    return res;
  }
  let vtRef = ref<VxeTableInstance>();

  function addRow() {
    tableConfig.data?.push(...genData(1));
  }

  function delRow() {
    tableConfig.data?.splice(0, 1);
    console.log('tableConfig.data', typeof tableConfig.data, tableConfig.data);
  }

  function mergeCell() {
    if (tableConfig.mergeCells?.length != 0) {
      tableConfig.mergeCells = [];
    } else {
      tableConfig.mergeCells = [
        { row: 1, col: 1, rowspan: 1, colspan: 3 },
        { row: 5, col: 4, rowspan: 2, colspan: 2 },
      ] as VxeTablePropTypes.MergeCells;
    }
  }
  onMounted(() => {});
</script>

<style lang="less" scoped></style>
