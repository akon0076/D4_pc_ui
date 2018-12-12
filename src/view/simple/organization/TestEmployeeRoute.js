

//测试表单管理

export default [
{
    path: '/simple/organization/TestEmployee',
    name: 'simple_organization_TestEmployee',
    meta: {
        label: '组织测试表单',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestEmployeeList')
},
{
    path: '/simple/organization/TestEmployee/add',
    name: 'simple_organization_TestEmployee_ddd',
    meta: {
        label: '新增测试表单',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestEmployeeForm')
},
{
    path: '/simple/organization/TestEmployee/edit/:testEmployeeId',
    name: 'simple_organization_TestEmployee_edit',
    meta: {
        label: '编辑测试表单',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestEmployeeForm')
},
{
    path: '/simple/organization/TestEmployee/display/:testEmployeeId',
    name: 'simple_organization_TestEmployee_display',
    meta: {
        label: '查看测试表单',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestEmployeeDisplay')
}
]
