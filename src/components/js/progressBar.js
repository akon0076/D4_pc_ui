import vue from '@/main'
function buttonRequestProgressStart (text) {
    if(text==undefined||text=="")
      text="正在努力加载中,请稍后..."
    const loading = vue.$loading({
      lock: true,
      text: text,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.1)'
    });
}
function  buttonRequestProgressClose() {
  const loading = vue.$loading({})
  loading.close();
}
export default {
  // Vue.js的插件应当有一个公开方法 install这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
  install: function (Vue) {
    Vue.prototype.buttonRequestProgressStart = (text) => buttonRequestProgressStart(text)
    Vue.prototype.buttonRequestProgressClose = () => buttonRequestProgressClose()
  }
}

