import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const myRoute: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/demo/pyramid',
  meta: {
    orderNo: 10,
    icon: 'bx:food-menu',
    title: 'Demo',
  },
  children: [
    {
      path: 'pyramid',
      name: 'Pyramid',
      component: () => import('/@/views/demo/pyramid/index.vue'),
      meta: {
        icon: 'vaadin:pyramid-chart',
        title: '质量金字塔',
      },
    },
    {
      path: 'formTable',
      name: 'FormTable',
      component: () => import('/@/views/demo/formTable/index.vue'),
      meta: {
        icon: 'ph:table-bold',
        title: 'TEF表格用例',
      },
    },
    {
      path: 'formSample',
      name: 'FormSample',
      component: () => import('/@/views/demo/formSample/index.vue'),
      meta: {
        icon: 'ph:table-bold',
        title: 'TEF表单用例',
      },
    },
    {
      path: 'vxetable',
      name: 'Vxetable',
      component: () => import('/@/views/demo/vxetable/index.vue'),
      meta: {
        icon: 'ph:table-bold',
        title: 'VxeTable(vben封装)',
      },
    },
    {
      path: 'vxetable2',
      name: 'Vxetable2',
      component: () => import('/@/views/demo/vxetable/index2.vue'),
      meta: {
        icon: 'ph:table-bold',
        title: 'VxeTable(原生)',
      },
    },

    {
      path: 'upload1',
      name: 'Upload1',
      component: () => import('/@/views/demo/upload/index.vue'),
      meta: {
        icon: 'mdi:upload-outline',
        title: '上传文件1',
        roles: ['wxp-template-vue.demo.upload1.page.view', 'defaultValue'],
      },
    },
    {
      path: 'upload2',
      name: 'Upload2',
      component: () => import('/@/views/demo/upload/index2.vue'),
      meta: {
        icon: 'mdi:upload-outline',
        title: '上传文件2',
      },
    },
    {
      path: 'download',
      name: 'Download',
      component: () => import('/@/views/demo/download/index.vue'),
      meta: {
        icon: 'mdi:download-outline',
        title: '下载文件',
      },
    },
    {
      path: 'authPage',
      name: 'AuthPage',
      component: () => import('/@/views/demo/authPage/index.vue'),
      meta: {
        icon: 'ic:outline-lock',
        title: '鉴权页面',
        //任意一个匹配即可
        roles: ['wxp-template-vue.demo.authPage.page.view', 'xxxxxxxxxxx'],
      },
    },
    {
      path: 'variable',
      name: 'Variable',
      component: () => import('/@/views/demo/variable/index.vue'),
      meta: {
        icon: 'carbon:parameter',
        title: '运行时变量',
      },
    },
    {
      path: 'treeSample',
      name: 'TreeSample',
      component: () => import('/@/views/demo/treeSample/index.vue'),
      meta: {
        icon: 'mdi:file-tree-outline',
        title: '树形控件',
      },
    },
    {
      path: 'treeSelect',
      name: 'TreeSelect',
      component: () => import('/@/views/demo/treeSelect/index.vue'),
      meta: {
        icon: 'mdi:file-tree-outline',
        title: '树选择',
      },
    },
  ],
};

export default myRoute;