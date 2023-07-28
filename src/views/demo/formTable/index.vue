<template>
  <div>
    <BasicTable @register="registerTable">
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
  import { useMessage } from '/@/hooks/web/useMessage';
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
</script>
