import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 引入函数
import importVant from './plugins/index.js'

const app = createApp(App)
app.use(store);
importVant(app);    // 调用函数
app.use(router).mount('#app')
