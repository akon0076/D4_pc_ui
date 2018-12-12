

//角色管理

export default [
{
    path: '/simple/permission/Role',
    name: 'simple_permission_Role',
    meta: {
        label: '组织角色',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./RoleList')
},
{
    path: '/simple/permission/Role/add',
    name: 'simple_permission_Role_ddd',
    meta: {
        label: '新增角色',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./RoleForm')
},
{
    path: '/simple/permission/Role/edit/:roleId',
    name: 'simple_permission_Role_edit',
    meta: {
        label: '编辑角色',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./RoleForm')
},
{
    path: '/simple/permission/Role/display/:roleId',
    name: 'simple_permission_Role_display',
    meta: {
        label: '查看角色',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./RoleDisplay')
}
]
