import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import ElementUI from 'element-ui'; // 2.1引入结构
import 'element-ui/lib/theme-chalk/index.css'; // 2.2引入样式
import Vuex from 'vuex';
import cookie from 'vue-cookies'


export const eventBus = new Vue();
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex)
Vue.use(cookie)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
