import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {store} from '../store'
import simpleRoute from '../view/simple/simpleRoute';



Vue.use(Router)
const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      label: '登录',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false
    },
    component: () => import('../view/login/LoginPage')
  },
  {
    path: '/wisdomCateringLogin',
    name: 'wisdomCateringLogin',
    meta: {
      label: '智慧餐饮后台登录',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false
    },
    component: () => import('../view/simple/wisdomCateringLogin/login')
  },
  {
    path: '/generate',
    name: 'generate',
    meta: {
      label: '生成代码',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false
    },
    component: () => import('../view/dev/generator')
  },
  {
    path: '/wisdomCateringMain',
    name: 'wisdomCateringMain',
    meta: {
      label: '智慧餐饮后台管理主页面',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false
    },
    component: () => import('../view/simple/wisdomCateringMain/main'),
  },
  {
    path: '/organizationRegistForm',
    name: 'organizationRegistForm',
    meta: {
      label: '单位注册',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false
    },
    component: () => import('../view/simple/regist/OrganizationRegistForm'),
  }
  ,
  // {
  //   path: '/taskWork',
  //   name: 'taskWork',
  //   meta: {
  //     label: '定时任务',
  //     icon: 'icon iconfont icon-fl-origin',
  //     requireAuth: false
  //   },
  //   component: () => import('../view/task'),
  //   children: [
  //     {
  //       path: '/',
  //       name: 'tableList',
  //       meta: {
  //         label: '表格',
  //         icon: 'icon iconfont icon-fl-origin',
  //         requireAuth: false
  //       },
  //       component: () => import('../view/task/table'),
  //     },
  //     {
  //       path: '/tableList',
  //       name: 'tableList',
  //       meta: {
  //         label: '表格',
  //         icon: 'icon iconfont icon-fl-origin',
  //         requireAuth: false
  //       },
  //       component: () => import('../view/task/table'),
  //     },
  //     {
  //       path: '/form',
  //       name: 'form',
  //       meta: {
  //         label: '新增',
  //         icon: 'icon iconfont icon-fl-origin',
  //         requireAuth: false
  //       },
  //       component: () => import('../view/task/form'),
  //     }
  //   ]
  // },
  {
    path: '/EmployeeRegistForm',
    name: 'EmployeeRegistForm',
    meta: {
      label: '人员注册',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false
    },
    component: () => import('../view/simple/regist/EmployeRegistForm'),
  },
  {
    path: '/MemberRegistForm',
    name: 'MemberRegistForm',
    meta: {
      label: '人员注册',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: false
    },
    component: () => import('../view/simple/regist/MemberRegistForm'),
  },
  {
    path: '/',
    component: () => import('../view/main/main'),
    children: [
      {
        path: '/',
        name: 'main',
        component: () => import('../view')
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    //component: () => import('@/packages/ui/errorPage/404.vue')
  },
  ...simpleRoute,
]

const router = new Router({
  routes,
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  /** 判断用户是否已经登录 */
  if (store.getters.isLogin) {
    /** 已经登录情况下访问 /login, 则直接进入 /admin */
    if (to.path === '/login') {
      next();
      NProgress.done()
    } else {
      next();
    }
  } else {
    if (noPermission(to.path) || (to.meta.requireAuth == false)) {
      next();
    } else {
      next('/login');
      NProgress.done();
    }
  }
});


router.afterEach(() => {
  NProgress.done()
});

function noPermission(path) {
  return ['/404',].indexOf(path) > -1
}

export default router;
