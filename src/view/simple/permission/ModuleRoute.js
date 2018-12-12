

//模块管理

export default [
{
    path: '/simple/permission/Module',
    name: 'simple_permission_Module',
    meta: {
        label: '组织模块',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./ModuleList')
},
{
    path: '/simple/permission/Module/add',
    name: 'simple_permission_Module_ddd',
    meta: {
        label: '新增模块',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./ModuleForm')
},
{
    path: '/simple/permission/Module/edit/:moduleId',
    name: 'simple_permission_Module_edit',
    meta: {
        label: '编辑模块',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./ModuleForm')
},
{
    path: '/simple/permission/Module/display/:moduleId',
    name: 'simple_permission_Module_display',
    meta: {
        label: '查看模块',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./ModuleDisplay')
}
]
