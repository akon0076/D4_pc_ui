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
import globalJs from '@/components/js/progressBar'
import filters from './filters';

Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
/** 注册 element 组件 */
Vue.use(ElementUI, {size: 'medium'});
Vue.use(globalJs);
/** 注册一个全局自定义指令 */
directive.map(directive => Vue.directive(directive.name, directive.event));

/**
 * 全局注册一个时间处理方法
 */
import moment from 'moment'
Vue.filter('dateFormat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
});

/* eslint-disable no-new */
var vue=  new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default vue;
