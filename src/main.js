import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

Vue.prototype.$axios = axios

//src下的assets目录下的图片
Vue.use(VueLazyload,{
  error:require('./assets/imgs/error.jpg'),
  loading:require('./assets/imgs/loading.gif')
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
