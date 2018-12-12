<template>
  <div class="tree-view-menu">
    <el-row>
      <el-col >
        <el-menu
          class="el-menu-vertical-silder"
          :collapse="isCollapse"
          router
          collapse-transition
          unique-opened
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#1890ff">
    <Tree-view-item :menus='menus'></Tree-view-item>
        </el-menu>
      </el-col><!--  style="width: 180px;height: calc(100% - 46px);"-->
    </el-row>
  </div>
</template>
<script>
  import TreeViewItem from "./TreeViewItem";
  import {LoginService} from '../../../view/login/loginService';
  import {mapState} from 'vuex';

  const menusData = [];
  export default {
    components: {
      TreeViewItem
    },
    name: "TreeViewMenu",
    data() {
      return {
      };
    },
    created() {
    },
    computed: {
      ...mapState({
        menus: state => state.permission.menus,
        isCollapse:state=>state.permission.isCollapse
      })
    }

  };
</script>
<style scoped lang="scss">
  .el-menu-vertical-silder.el-menu--collapse {
    width: 62px;
  }

  .el-menu-vertical-silder.el-menu {
    height: 100%;
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
  .tree-view-menu {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color:#545c64
  }
  .tree-view-menu::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }
  .tree-view-menu::-webkit-scrollbar-trac {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .tree-view-menu::-webkit-scrollbar-thumb {
    background-color: #6e6e6e;
    outline: 1px solid #333;
  }
  .tree-view-menu::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }
  .tree-view-menu::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .tree-view-menu::-webkit-scrollbar-thumb {
    background-color: #6e6e6e;
    outline: 1px solid #708090;
  }
</style>
