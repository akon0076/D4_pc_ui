import {Msg} from "../../tools/message";
import {LoginService} from "../../view/login/loginService";

const Jurisdiction = [
];

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.permission) {
    return roles.some(role => route.meta.permission.indexOf(role) >= 0)
  }
  return false
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permission
 */
function filterAsyncRouter(asyncRouterMap, permission) {
  return asyncRouterMap.filter(route => {
    if (hasPermission(permission, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permission)
      }
      return true
    }
    return false
  })
}

let levelNum = 1;
let startExpand = []; // 保存刷新后当前要展开的菜单项
function setExpand(source, url) {

  let sourceItem = '';
  if(source && source.length)
  {
    for (let i = 0; i < source.length; i++) {
      sourceItem = JSON.stringify(source[i]); // 把菜单项转为字符串
      if (sourceItem.indexOf(url) > -1) { // 查找当前 URL 所对应的子菜单属于哪一个祖先菜单
        if (source[i].type === 'button') { // 导航菜单为按钮
          source[i].isSelected = true; // 设置选中高亮
          source[i].isExpanded = true; // 设置为展开
          startExpand.push(source[i]);
          // 递归下一级菜单，以此类推
          setExpand(source[i].nodes, url);
        }
        break;
      }
    }
  }
}

const permission = {
  state: {
    isCollapse: false,
    menus:[]
  },
  mutations: {
    COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse
    },
    SLIDER_OPEN(state) {
      state.isCollapse = false
    },
    SLIDER_CLOSE(state) {
      state.isCollapse = true
    },
    setMenus(state,data){
      state.menus = data.data.nodes;
    },
    findParents(state, payload) {

      if (payload.menu.nodes != null && payload.menu.nodes.length != 0) {//顶级不是最末级
        payload.menu.isExpanded = !payload.menu.isExpanded;
      } else if (payload.menu.nodes == null || payload.menu.nodes.length == 0) {//最末级
        if (startExpand.length > 0) {
          for (let i = 0; i < startExpand.length; i++) {
            startExpand[i].isSelected = false;
          }
        }
        startExpand = []; // 清空展开菜单记录项
        setExpand(state.menus, payload.menu.url);
      };
    },
    firstInit(state, payload) {

      setExpand(state.menus, payload.url);
    }
  },
  actions: {
    //查询菜单
    constructNewTree({commit}, params){
      return new Promise((resolve, reject) => {
        LoginService.constructNewTree(params.operatorId,params.moduleType).then((res) => {
            commit('setMenus', {...res, params});
            resolve(res)
        }).catch(err => {
          reject(err);
        })
      })
    },
    //智慧餐饮查询菜单
    wisdomCateringConstructNewTree({commit}, params){
      return new Promise((resolve, reject) => {
        debugger
        LoginService.wisdomCateringConstructNewTree(params.operatorId,params.moduleType).then((res) => {
          commit('setMenus', {...res, params});
          resolve()
        }).catch(err => {
        })
      })
    }
  }
};


export default permission
