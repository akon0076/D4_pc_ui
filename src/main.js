// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import {store} from './store'
import directive from './tools/directive'
import './assets/icon/iconfont.css'
import './assets/styles/index.scss'

import filters from './filters';

Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
/** 注册 element 组件 */
Vue.use(ElementUI, {size: 'medium'});


/** 注册一个全局自定义指令 */
directive.map(directive => Vue.directive(directive.name, directive.event));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
