import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './styles/index.less'
import { debounce } from './utils/util'
import * as echarts from 'echarts'
import axios from 'axios';
const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$debounce = debounce;

app.use(ElementPlus)
app.use(store)
app.use(router)

app.mount('#app')
