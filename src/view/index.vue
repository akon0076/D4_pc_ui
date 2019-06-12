<template>
  <div  class="main_index">
    <!--根据自己的需求进行更改,只是搞起好玩的-->
    <div style="
    color: black">
      欢迎登陆: <h3>{{userInfo.userName}}</h3> {{new Date()}}
    </div>
    <el-card v-for="item in items" :key="item.key" class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        src:"008",
        visible: false,
        data: [],
        items:[{key:""},{key:""},{key:""},{key:""},{key:""},{key:""},{key:""},{key:""},{key:""}]
      }
    },
    computed: mapState({
      userInfo: state => state.user.userInfo
    }),
    methods: {
      changeLogo(){
        const timer=setInterval(()=>{
        var i=1+Math.trunc(Math.random()*9);
         this.src="00"+i;
        },5000);
        this.$once('hook:beforeDestroy', () => {
          clearInterval(timer);
        })
      },
      open() {
        this.visible = true;
      },
      handleClose() {
        this.visible = false;
      },
    },
    created(){
    },
    watch: {
      data(val) {
      }
    }
  }
</script>
<style scoped lang="scss">
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    float: left;
    margin:10px 10px 10px 10px;
  }
</style>
