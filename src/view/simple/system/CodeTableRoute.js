

//码表管理

export default [
{
    path: '/simple/system/CodeTable',
    name: 'simple_system_CodeTable',
    meta: {
        label: '组织码表',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./CodeTableList')
},
{
    path: '/simple/system/CodeTable/add',
    name: 'simple_system_CodeTable_ddd',
    meta: {
        label: '新增码表',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./CodeTableForm')
},
{
    path: '/simple/system/CodeTable/edit/:codeTableId',
    name: 'simple_system_CodeTable_edit',
    meta: {
        label: '编辑码表',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./CodeTableForm')
},
{
    path: '/simple/system/CodeTable/display/:codeTableId',
    name: 'simple_system_CodeTable_display',
    meta: {
        label: '查看码表',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./CodeTableDisplay')
}
]