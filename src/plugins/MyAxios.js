// 配置axios
import axios from 'axios';
const MyAxios = {};
MyAxios.install = function (Vue) {
  // 配置基准路径
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  // 配置axios
  Vue.prototype.$http = axios;
};

export default MyAxios;
