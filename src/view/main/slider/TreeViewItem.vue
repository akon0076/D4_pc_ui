<template>
  <div class="tree-view-item">

          <div   v-for="menu in menus">
            <div v-if="menu.nodes == null || menu.nodes.length == 0">
             <el-menu-item  :index="menu.routeData">{{menu.text}}</el-menu-item>
            </div>
            <div v-if="menu.nodes != null && menu.nodes.length != 0">
              <el-submenu :index="menu.id">
                <template slot="title">
                  <i :class="menu.icon"></i>
                  <span   :class="{selected: menu.isSelected,collapsed:isCollapse&&menu.level==1}" @click="toggle(menu)">{{menu.text}}</span>
                </template>
                <TreeViewItem :menus='menu.nodes'></TreeViewItem>
              </el-submenu>
            </div>
          </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default {
    name: "TreeViewItem",
    props: ["menus"],
    created() {
      this.$store.commit("firstInit", { url: this.$route.path });
    },
    computed: {
      ...mapState({
        isCollapse:state=>state.permission.isCollapse
      })
    },
    methods: {
      toggle(menu) {
        this.$store.commit("findParents", { menu });
      }
    }
  };
</script>
<style scoped>
  a {
    text-decoration: none;
    color: #333;
  }
  .link,
  .button {
    display: block;
    padding: 10px 15px;
    transition: background-color 0.2s ease-in-out 0s, color 0.3s ease-in-out 0.1s;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    color: white;
  }
  .button {
    position: relative;
  }
  .link:hover,
  .button:hover {
    color: #1976d2;
    background-color: #eee;
    cursor: pointer;
  }
  .icon {
    position: absolute;
    right: 0;
    display: inline-block;
    height: 24px;
    width: 24px;
    fill: currentColor;
    transition: -webkit-transform 0.15s;
    transition: transform 0.15s;
    transition: transform 0.15s, -webkit-transform 0.15s;
    transition-timing-function: ease-in-out;
  }
  .heading-children {
    padding-left: 14px;
    overflow: hidden;
  }
  .expand {
  }
  .collapsed {
    display: none;
  }
  .expand .icon {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .selected {
    color: #1976d2;
  }
  .fade-enter-active {
    transition: all 0.5s ease 0s;
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-leave-to {
    height: 0;
  }
</style>
