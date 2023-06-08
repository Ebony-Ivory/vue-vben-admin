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
    icon: 'ion:grid-outline',
    title:'Demo',
  },
  children: [
    {
      path: 'pyramid',
      name: 'Pyramid',
      component: () => import('/@/views/demo/pyramid/index.vue'),
      meta: {
        title: '金字塔',
      },
    },
  ],
};

export default myRoute;
