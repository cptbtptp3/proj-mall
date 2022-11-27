import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import toast from "@/components/common/toast";
import fastclick from 'fastclick'
import VueLazyload from "vue-lazyload";

//添加事件总线
Vue.prototype.$bus = new Vue()
Vue.use(toast)
//图片懒加载
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
//减少点击延迟
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

//px2vw插件  将固定像素px转换成vh vw 需要配置postcss.config.js
