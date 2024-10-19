import { createApp } from 'vue'
import App from './App.vue'
// 引入 Ant Design Vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// 引入路由
import router from './router/index';

const app = createApp(App);
app.use(Antd).use(router).mount('#app');