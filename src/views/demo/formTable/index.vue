<template>
  <div>
    <BasicTable @register="registerTable" @rowClick="doOnRowClick">
      <template #toolbar>
        <ImpExcel @success="handleImport" dateFormat="YYYY-MM-DD">
          <Button type="success">导入Excel</Button>
        </ImpExcel>
        <Button type="warning" @click="handleExport">导出Excel</Button>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction :actions="getActionItems(record)" />
        </template>
      </template>
    </BasicTable>
    <MyDrawer @register="registerMyDrawer" @success="handleMyDrawerSuccess"></MyDrawer>
  </div>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { getBasicColumns, getTableSearchFormConfig } from './config';
  import MyDrawer from './MyDrawer.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { Button } from '/@/components/Button';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ImpExcel, ExcelData, jsonToSheetXlsx } from '/@/components/Excel';

  function getActionItems(record): ActionItem[] {
    return [
      {
        label: '新增',
        icon: 'mdi:plus-box',
        tooltip: '新增',
        onClick: handleAdd.bind(null, record),
      },
      {
        label: '更新',
        icon: 'mdi:clipboard-edit',
        tooltip: '更新',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '删除(鉴权)',
        icon: 'ant-design:delete-outlined',
        color: 'error',
        tooltip: '删除(鉴权)',
        //权限码
        auth: ['xxxxxxxxxx'],
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }

  //整行点击事件
  //行内子元素点击事件需要停止传递
  function doOnRowClick(rowData: Recordable, rowIndex: number, event: PointerEvent) {
    console.log('🚀 doOnRowClick 🔶 rowData=>', rowData);
  }
  const { createMessage: msg } = useMessage();
  const [registerTable, { reload }] = useTable({
    title: '这里填表格标题(含整行点击事件)',
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
      title: '操作(删除按钮鉴权)',
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

  function handleAdd(record: Recordable, event: PointerEvent) {
    //阻止整行点击事件
    event.stopPropagation();
    openMyDrawer(true, record);
  }
  function handleEdit(record: Recordable, event: PointerEvent) {
    //阻止整行点击事件
    event.stopPropagation();
    console.log('🚀 🔶 handleEdit 🔶 record=>', record);
  }

  function handleDelete(record: Recordable, event: PointerEvent) {
    //阻止整行点击事件
    event.stopPropagation();
    console.log('🚀 🔶 handleDelete 🔶 record=>', record);
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
