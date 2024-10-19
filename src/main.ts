import { createApp } from 'vue'
import App from './App.vue'
// 引入 Ant Design Vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
// 引入路由
import router from './router/index';
// 引入图标
import * as Icons from "@ant-design/icons-vue";
// 引入Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App);
// 注册图标组件
Object.keys(Icons).forEach((key)=>{
    app.component(key,Icons[key as keyof typeof Icons])
})
// 使用
app.use(Antd).use(router).mount('#app');