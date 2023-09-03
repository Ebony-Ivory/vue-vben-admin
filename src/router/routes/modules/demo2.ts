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
        icon: 'devicon-plain:vuetify',
        title: 'Vuetify使用',
      },
    },
  ],
};

export default myRoute;
