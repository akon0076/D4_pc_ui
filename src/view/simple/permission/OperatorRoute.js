

//操作员管理

export default [
{
    path: '/simple/permission/Operator',
    name: 'simple_permission_Operator',
    meta: {
        label: '组织操作员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OperatorList')
},
{
    path: '/simple/permission/Operator/add',
    name: 'simple_permission_Operator_ddd',
    meta: {
        label: '新增操作员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OperatorForm')
},
{
    path: '/simple/permission/Operator/edit/:operatorId',
    name: 'simple_permission_Operator_edit',
    meta: {
        label: '编辑操作员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OperatorForm')
},
{
    path: '/simple/permission/Operator/display/:operatorId',
    name: 'simple_permission_Operator_display',
    meta: {
        label: '查看操作员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OperatorDisplay')
}
]
