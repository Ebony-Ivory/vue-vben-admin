import type { App } from 'vue';
import { Button } from './Button';
import { Input, Layout } from 'ant-design-vue';
import VXETable from 'vxe-table';
import { createVuetify } from 'vuetify';
//引入vuetify,使用默认配置
//不全量引入
const vuetify = createVuetify();
export function registerGlobComp(app: App) {
  app.use(Input).use(Button).use(Layout).use(VXETable).use(vuetify);
}
