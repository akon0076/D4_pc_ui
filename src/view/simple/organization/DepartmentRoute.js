

//部门管理

export default [
{
    path: '/simple/organization/Department',
    name: 'simple_organization_Department',
    meta: {
        label: '部门管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./DepartmentList')
},
{
    path: '/simple/organization/Department/add',
    name: 'simple_organization_Department_ddd',
    meta: {
        label: '新增部门',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./DepartmentForm')
},
{
    path: '/simple/organization/Department/edit/:departmentId',
    name: 'simple_organization_Department_edit',
    meta: {
        label: '编辑部门',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./DepartmentForm')
},
{
    path: '/simple/organization/Department/display/:departmentId',
    name: 'simple_organization_Department_display',
    meta: {
        label: '查看部门',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./DepartmentDisplay')
}
]
