import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const myRoute: AppRouteModule = {
  path: '/demo2',
  name: 'Demo2',
  component: LAYOUT,
  redirect: '/demo2/vuetify',
  meta: {
    orderNo: 10,
    icon: 'bx:food-menu',
    title: 'Demo2',
  },
  children: [
    {
      path: 'vuetify',
      name: 'Vuetify',
      component: () => import('/@/views/demo2/vuetify/index.vue'),
      meta: {
        icon: 'mdi:vuetify',
        title: 'Vuetify使用',
      },
    },
    {
      path: 'frontTimeout',
      name: 'FrontTimeout',
      component: () => import('/@/views/demo2/timeout/index.vue'),
      meta: {
        icon: 'ic:round-more-time',
        title: '超时控制',
      },
    },
  ],
};

export default myRoute;
