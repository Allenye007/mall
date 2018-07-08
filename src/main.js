// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 导入ElementUi
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入 MyAxios
import MyAxios from './plugins/MyAxios';
// 导入公共样式
import './assets/css/base.css';
// 注册ElementUi
Vue.use(ElementUi);
// 导入axios 并注册
Vue.use(MyAxios);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
