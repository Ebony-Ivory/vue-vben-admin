<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <ImpExcel @success="handleImport" dateFormat="YYYY-MM-DD">
          <Button type="success">导入Excel</Button>
        </ImpExcel>
        <Button type="warning" @click="handleExport">导出Excel</Button>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                label: '新增',
                icon: 'mdi:plus-box',
                tooltip: '新增',
                onClick: handleAdd.bind(null, record),
              },

              {
                label: '更新(鉴权)',
                icon: 'mdi:clipboard-edit',
                tooltip: '更新(鉴权)',
                //权限码
                auth: ['super'],
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <MyDrawer @register="registerMyDrawer" @success="handleMyDrawerSuccess"></MyDrawer>
  </div>
</template>
<script lang="ts" setup>
  // import { ref, onBeforeMount, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getTableSearchFormConfig } from './config';
  import MyDrawer from './MyDrawer.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { Button } from '/@/components/Button';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ImpExcel, ExcelData, jsonToSheetXlsx } from '/@/components/Excel';
  const { createMessage: msg } = useMessage();
  const [registerTable, { reload }] = useTable({
    title: '这里填表格标题',
    api: getPageData,
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getTableSearchFormConfig(),
    showTableSetting: true,
    showIndexColumn: true,
    bordered: true,
    pagination: {
      pageSize: 10,
    },
    rowKey: 'id',
    actionColumn: {
      width: 250,
      title: '操作',
      dataIndex: 'action',
    },
  });

  //模拟表格数据
  function getPageData() {
    let arr = Array.from({ length: 20 }).map((_, index) => ({
      id: index,
      a: `a-${index}`,
      b: `b-${index}`,
      c: `c-${index}`,
    }));
    return Promise.resolve(arr);
  }

  //add
  const [registerMyDrawer, { openDrawer: openMyDrawer }] = useDrawer();
  function handleMyDrawerSuccess(data) {
    msg.success('add success');
    reload();
  }

  function handleAdd(record: Recordable) {
    openMyDrawer(true, record);
  }
  function handleEdit(record: Recordable) {
    console.log('🚀 🔶 handleEdit 🔶 record=>', record);
    // openMyDrawer(true, record);
  }

  // 导入处理
  function handleImport(excelDataList: ExcelData[]) {
    msg.success('数据看控制台');
    console.log('读取到的Excel数据', excelDataList);
    // 数据的具体处理自行实现
  }

  //导出处理
  async function handleExport() {
    // 数据的获取自行实现
    // 模拟获取
    let data = await getPageData();
    jsonToSheetXlsx({
      data,
      filename: '使用key作为默认头部.xlsx',
    });
  }
</script>
