<template>
  <div style="background-color: rgb(238, 241, 246)">
    <div class="mh-admin-title" v-on:click="handMain">
      <router-link class="head-link" to="/wisdomCateringMain" style="display: block">
        <div :class="!isCollapse ? 'title-animation':'title-logo'">{{title}}</div>
      </router-link>
    </div>
    <Tree-view class="el-menu-vertical-silder"
               text-color="#ffffff"
               :default-active="defaultActivatedMenu"
               active-text-color="#ffffff"
               width="180px">
    </Tree-view>
    <span class="side_trgger" @click="COLLAPSE" :style="{left: isCollapse?'74px':'190px'}">
       <i class="iconfont" :class="menuToger"></i>
    </span>
  </div>
</template>
<script>
  import {mapMutations, mapState} from 'vuex'
  import {debounce} from '@/tools/utils'
  import TreeView from "./TreeView";

  export default {
    name: 'slider',
    components: {
      TreeView
    },
    data() {
      return {
        title: '智慧餐饮后台管理系统',
        debugInfos: {}
      }
    },
    props: {
      menuList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created() {
      window.addEventListener('resize', this.__resizeHanlder);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.__resizeHanlder)
    },
    methods: {
      ...mapMutations([
        'COLLAPSE',
        'SLIDER_OPEN',
        'SLIDER_CLOSE'
      ]),
      iconClass(icon) {
        return `el-icon-${icon}`
      },
      handMain() {
        this.$emit('handMain', '')
      },
      __resizeHanlder() {
        debounce(() => {
          if (window.innerWidth > 1200) {
            this.SLIDER_OPEN()
          } else if (window.innerWidth < 1200) {
            this.SLIDER_CLOSE()
          }
        }, 100)();
      }
    },
    computed: {
      ...mapState({
         isCollapse: state => state.permission.isCollapse,
      }),
      menuToger: function () {
        return !this.isCollapse ? 'icon-shouqicaidan' : 'icon-zhankaicaidan'
      },
      menuTogerTitle: function () {
        return this.isCollapse ? '展开菜单' : '收起菜单'
      },
      defaultActivatedMenu: function () {
        return this.$route.path.replace(/\//g, '_')
      }
    },
    watch: {
      $route() {
        this.$nextTick(() => {
        })
      },
      isCollapse(val, oldVal) {
        if (val) {
          this.title = ''
        } else if (oldVal) {
          setTimeout(() => {
            this.title = '智慧餐饮后台管理系统'
          }, 200)
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../assets/styles/var";

  .el-menu-vertical-silder.el-menu {
    height: calc(100% - 46px);
    .icon {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      vertical-align: middle;
    }
  }

  .el-menu-vertical-silder:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }

  .side_trgger {
    position: absolute;
    top: 16px;
    z-index: 1;
    -webkit-transition: all .3s ease-in-out;
    transition: 0.3s left ease-in-out;
    > i {
      font-size: 24px;
      color: #666;
      &:hover {
        color: $bg_main_color;
        cursor: pointer;
      }
    }
  }

  .el-menu-item {
    a {
      color: rgb(191, 203, 217);
    }
  }

  .el-menu {
    height: 100%;
  }

  .el-menu-item.is-active > a {
    color: $bg_main_color;
  }

  .el-menu-item-group a {
    text-decoration: none;
  }

  .head-link {
    text-decoration: none;
    &:active {
      text-decoration: none;
    }
  }

  .el-menu-item.is-active {
    background-color: $bg_main_color !important;
  }

  .el-menu-vertical-silder {
    .el-menu {
      height: 46px;
      line-height: 46px;
    }
  }

  .mh-admin-title {
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 45px;
    background-color: #193751;
    padding-right: 1px;
    border-right: 1px solid #fff;
    transition: 0.3s all ease-in-out;
  }

  .title-logo {
    width: 30px;
    height: 30px;
    //background-image: url("../../../assets/images/favicon.ico");
    background-size: cover;
    background-position: 50%;
    border-radius: 50%;
    border: 1px solid #666666;
  }

  .title-animation {
    animation: mymove 1s alternate forwards;
    /*Safari and Chrome*/
    -webkit-animation: mymove 1s alternate forwards;
  }

  @keyframes mymove {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes mymove /*Safari and Chrome*/
  {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<style>

  .mh-admin-title a {
    color: #FFFFFF;
    font-size: 14px;
    text-decoration: none;
  }

  .el-menu-item a {
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }

  .el-menu-vertical-silder .el-menu-item {
    height: 46px;
    line-height: 46px;
  }

  .el-menu-item-group .icon {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }

  .sc-menu a {
    text-decoration: none;
  }
</style>
