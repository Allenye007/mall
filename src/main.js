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
// 导入 moment  时间格式
import moment from 'moment';
// 导入面包屑组件  在下面注册组件
import breadcrumb from '../src/components/Breadcrumb.vue';
// 注册ElementUi
Vue.use(ElementUi);
// 导入axios 并注册
Vue.use(MyAxios);
// 面包屑组件
// 参数： 组件名  导入的组件
Vue.component(breadcrumb.name, breadcrumb);
Vue.config.productionTip = false;
// 全局过滤器  格式化日期
// 参数 ： 过滤器名字 回调函数
Vue.filter('fmtdata', (value, fmtString) => {
  return moment(value).format(fmtString);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
