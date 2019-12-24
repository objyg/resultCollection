
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import qs from 'qs';
Vue.prototype.$qs = qs;
//import axios from 'axios'
//Vue.prototype.$ajax = axios;
//设置反向代理，前端请求默认发送到：http://localhost:8080/api

var axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8089/api';
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      if (store.state.user.studentNumber) {
        next()
      } else {
        alert("请先登录")
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
);

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
