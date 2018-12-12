

//角色权限点管理

export default [
{
    path: '/simple/permission/RoleAndPermission',
    name: 'simple_permission_RoleAndPermission',
    meta: {
        label: '组织角色权限点',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./RoleAndPermissionList')
},
{
    path: '/simple/permission/RoleAndPermission/add',
    name: 'simple_permission_RoleAndPermission_ddd',
    meta: {
        label: '新增角色权限点',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./RoleAndPermissionForm')
},
{
    path: '/simple/permission/RoleAndPermission/edit/:roleAndPermissionId',
    name: 'simple_permission_RoleAndPermission_edit',
    meta: {
        label: '编辑角色权限点',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./RoleAndPermissionForm')
},
{
    path: '/simple/permission/RoleAndPermission/display/:roleAndPermissionId',
    name: 'simple_permission_RoleAndPermission_display',
    meta: {
        label: '查看角色权限点',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./RoleAndPermissionDisplay')
}
]
