<template>
  <el-container style="height: 100%;" >
    <!--菜单-->
    <comp-slider :menu-list="menuList" @handMain="changeTabs">
    </comp-slider>

    <el-container>
      <!--头部-->
      <el-header height="50" style="display: block;justify-content: space-between">
        <comp-head-user @openEditorPwd="openEditorPwd">
        </comp-head-user>
      </el-header>
      <el-main>
        <!--路由-->
        <router-view>
        </router-view>
      </el-main>
    </el-container>
    <comp-editor-pwd
      :dialogVisible="dialogVisible"
      @handleClose="handleClose"
    >
    </comp-editor-pwd>
  </el-container>
</template>

<script>

  import CompHeadUser from './head-user'
  import CompSlider from './slider'
  import CompEditorPwd from './editor-pwd'
  import {mapState} from 'vuex'
  import {Msg} from '../../../tools/message';

  export default {
    data() {
      return {
        menuList: [],
        menu: this.$route.path.split('/')[1],
        dialogVisible: false,
        fullscreen: false
      }
    },
    created() {
      this.getMenu()
    },
    components: {
      CompHeadUser,
      CompSlider,
      CompEditorPwd
    },
    methods: {
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;

      },
      changeTabs(name) {
        console.log(this.menuList)

        this.menu = name;
        this.getMenu()
      },
      getMenu() {

        var parms = {'operatorId':3,'moduleType':'电脑模块'};
        this.$store.dispatch('wisdomCateringConstructNewTree', parms).then(() => {
        }).catch(() => {

        })
      },
      openEditorPwd() {
        this.dialogVisible = true
      },
      handleClose() {
        this.dialogVisible = false
      }
    },
  }

</script>

<style scoped lang="scss">
  .el-container {
    width: 100%;
    height: 100%;

  }

  .el-header {
    height: 47px;
    line-height: 47px;
    border-radius: 0 !important;
    border-bottom: solid 1px #e6e6e6;
  }

  .el-header, .el-footer {
    color: #333;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    flex: inherit !important;
    padding: 10px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .main_title {
    margin: 0;
  }

  .icon.iconfont {
    margin-right: 5px;
  }

</style>
