import { createApp } from 'vue'
import App from './App.vue'
// 引入 Ant Design Vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(Antd).mount('#app');