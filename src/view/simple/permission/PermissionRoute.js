//权限点管理

export default [
  {
    path: '/simple/permission/Permission',
    name: 'simple_permission_Permission',
    meta: {
      label: '组织权限点',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./PermissionList')
  },
  {
    path: '/simple/permission/Permission/add',
    name: 'simple_permission_Permission_ddd',
    meta: {
      label: '新增权限点',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./PermissionForm')
  },
  {
    path: '/simple/permission/Permission/edit/:code',
    name: 'simple_permission_Permission_edit',
    meta: {
      label: '编辑权限点',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./PermissionForm')
  },
  {
    path: '/simple/permission/Permission/display/:code',
    name: 'simple_permission_Permission_display',
    meta: {
      label: '查看权限点',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./PermissionDisplay')
  }
]
