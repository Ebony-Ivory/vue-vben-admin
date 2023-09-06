import type { App } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
//引入vuetify,使用默认配置
//不全量引入
const vuetify = createVuetify();

export function installVuetify(app: App) {
  app.use(vuetify);
}