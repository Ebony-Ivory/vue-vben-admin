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
        title: '金字塔',
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
        title: 'VxeTable原生',
      },
    },

    {
      path: 'upload',
      name: 'Upload',
      component: () => import('/@/views/demo/upload/index.vue'),
      meta: {
        icon: 'mdi:upload-outline',
        title: '上传文件',
      },
    },
  ],
};

export default myRoute;
