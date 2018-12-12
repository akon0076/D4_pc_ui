

//操作员角色管理

export default [
{
    path: '/simple/permission/OperatorAndRole',
    name: 'simple_permission_OperatorAndRole',
    meta: {
        label: '组织操作员角色',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OperatorAndRoleList')
},
{
    path: '/simple/permission/OperatorAndRole/add',
    name: 'simple_permission_OperatorAndRole_ddd',
    meta: {
        label: '新增操作员角色',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OperatorAndRoleForm')
},
{
    path: '/simple/permission/OperatorAndRole/edit/:operatorAndRoleId',
    name: 'simple_permission_OperatorAndRole_edit',
    meta: {
        label: '编辑操作员角色',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OperatorAndRoleForm')
},
{
    path: '/simple/permission/OperatorAndRole/display/:operatorAndRoleId',
    name: 'simple_permission_OperatorAndRole_display',
    meta: {
        label: '查看操作员角色',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OperatorAndRoleDisplay')
}
]
