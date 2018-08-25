// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Loading from './components/loading/Loading'
import 'babel-polyfill'

//方便测试把ajax的请求路径设置成全局变量
window.ajaxUrl = "";


import  stores from './store/store'

// Vue.use(Loading);

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
// axios.interceptors.request.use(function (config) {  //配置发送请求的信息
//   stores.dispatch('showLoading')
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
//
axios.interceptors.response.use(function (response) { //配置请求回来的信息
  stores.dispatch('hideLoading');
  return response;
}, function (error) {
  return Promise.reject(error);
});

//绑定axios到vue的原型上面方便组件使用
Vue.prototype.$http = axios;

//引入reset.css
import './assets/css/reset.css'

//定义日期格式化过滤器
Vue.filter("normalTime",function (time) {
  if(time){
    var oDate=new Date();
    oDate.setTime(time);
    var y=oDate.getFullYear();
    var m=oDate.getMonth()+1;
    var d=oDate.getDate();
    var h=oDate.getHours();
    var mm=oDate.getMinutes();
    var s=oDate.getSeconds();

    if (m < 10){
      m = "0" + m
    }

    if (d < 10){
      d = "0" + d
    }

    if (h < 10){
      h = "0" + h
    }

    if (mm < 10){
      mm = "0" + mm
    }

    if (s < 10){
      s = "0" + s
    }
    return y+'-'+m+'-'+d+'  '+h+':'+mm+':'+s;
  }
})
//定义日期格式化过滤器
Vue.filter("homeTime",function (time) {
  if(time){
    var oDate=new Date();
    oDate.setTime(time);
    var y=oDate.getFullYear();
    var m=oDate.getMonth()+1;
    var d=oDate.getDate();
    var h=oDate.getHours();
    var mm=oDate.getMinutes();
    var s=oDate.getSeconds();

    if (m < 10){
      m = "0" + m
    }

    if (d < 10){
      d = "0" + d
    }

    if (h < 10){
      h = "0" + h
    }

    if (mm < 10){
      mm = "0" + mm
    }

    if (s < 10){
      s = "0" + s
    }
    return y+'-'+m+'-'+d;
  }
})
//截取附件的文件名
Vue.filter("cutFileName",function (file) {
  if (file){
    let fileArr = file.split("/");
    return fileArr[fileArr.length-1];
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:stores,

})
