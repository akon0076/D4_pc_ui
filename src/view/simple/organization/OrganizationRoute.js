

//单位管理

export default [
{
    path: '/simple/organization/Organization',
    name: 'simple_organization_Organization',
    meta: {
        label: '组织单位',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OrganizationList')
},
{
    path: '/simple/organization/Organization/add',
    name: 'simple_organization_Organization_ddd',
    meta: {
        label: '新增单位',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OrganizationForm')
},
{
    path: '/simple/organization/Organization/edit/:organizationId',
    name: 'simple_organization_Organization_edit',
    meta: {
        label: '编辑单位',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OrganizationForm')
},
{
    path: '/simple/organization/Organization/display/:organizationId',
    name: 'simple_organization_Organization_display',
    meta: {
        label: '查看单位',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./OrganizationDisplay')
}
]
