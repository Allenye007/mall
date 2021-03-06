// 配置axios
import axios from 'axios';
const MyAxios = {};
MyAxios.install = function (Vue) {
  // 配置基准路径
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.url.toLowerCase() !== 'login') {
      const token = sessionStorage.getItem('token');
      // 如果请求的地址不是login，设置token
      config.headers.Authorization = token;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  // 配置axios
  Vue.prototype.$http = axios;
};

export default MyAxios;
