

//单位注册管理

export default [
{
    path: '/simple/regist/OrganizationRegist',
    name: 'simple_regist_OrganizationRegist',
    meta: {
        label: '单位注册管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OrganizationRegistList')
},
{
    path: '/simple/regist/OrganizationRegist/add',
    name: 'simple_regist_OrganizationRegist_ddd',
    meta: {
        label: '新增单位注册',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OrganizationRegistForm')
},
{
    path: '/simple/regist/OrganizationRegist/edit/:organizationRegistId',
    name: 'simple_regist_OrganizationRegist_edit',
    meta: {
        label: '编辑单位注册',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OrganizationRegistForm')
},
{
    path: '/simple/regist/OrganizationRegist/display/:organizationRegistId',
    name: 'simple_regist_OrganizationRegist_display',
    meta: {
        label: '查看单位注册',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OrganizationRegistDisplay')
}
]
