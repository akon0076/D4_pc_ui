

//测试操作员管理

export default [
{
    path: '/simple/organization/TestOpeator',
    name: 'simple_organization_TestOpeator',
    meta: {
        label: '组织测试操作员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestOpeatorList')
},
{
    path: '/simple/organization/TestOpeator/add',
    name: 'simple_organization_TestOpeator_ddd',
    meta: {
        label: '新增测试操作员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestOpeatorForm')
},
{
    path: '/simple/organization/TestOpeator/edit/:testOpeatorId',
    name: 'simple_organization_TestOpeator_edit',
    meta: {
        label: '编辑测试操作员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestOpeatorForm')
},
{
    path: '/simple/organization/TestOpeator/display/:testOpeatorId',
    name: 'simple_organization_TestOpeator_display',
    meta: {
        label: '查看测试操作员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestOpeatorDisplay')
}
]
