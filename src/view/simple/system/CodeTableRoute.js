//码表管理

export default [
  {
    path: '/simple/system/CodeTable',
    name: 'simple_system_CodeTable',
    meta: {
      label: '组织码表',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./CodeTableList')
  },
  {
    path: '/simple/system/OrganizationCodeTable',
    name: 'simple_system_OrganizationCodeTable',
    meta: {
      label: '组织码表',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./OrgCodeTableList')
  },
  {
    path: '/simple/system/CodeTable/add/:type',
    name: 'simple_system_CodeTable_ddd',
    meta: {
      label: '新增码表',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./CodeTableForm')
  },
  {
    path: '/simple/system/OrgCodeTableForm/add/:type',
    name: 'simple_system_OrgCodeTableForm_ddd',
    meta: {
      label: '新增码表',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./OrgCodeTableForm')
  },
  {
    path: '/simple/system/CodeTable/edit/:type/:codeTableId',
    name: 'simple_system_CodeTable_edit',
    meta: {
      label: '编辑码表',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./CodeTableForm')
  },
  {
    path: '/simple/system/OrgCodeTableForm/edit/:type/:codeTableId',
    name: 'simple_system_OrgCodeTableForm_edit',
    meta: {
      label: '编辑码表',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./OrgCodeTableForm')
  },
  {
    path: '/simple/system/CodeTable/display/:codeTableId',
    name: 'simple_system_CodeTable_display',
    meta: {
      label: '查看码表',
      icon: 'icon iconfont icon-fl-origin',
      requireAuth: true,
    },
    component: () => import('./CodeTableDisplay')
  }
]
