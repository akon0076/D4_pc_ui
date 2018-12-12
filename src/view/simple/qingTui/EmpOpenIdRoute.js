

//码表管理

export default [
{
    path: '/simple/qingTui/EmpOpenId',
    name: 'simple_qingTui_EmpOpenId',
    meta: {
        label: '码表管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmpOpenIdList')
},
{
    path: '/simple/qingTui/EmpOpenId/add',
    name: 'simple_qingTui_EmpOpenId_ddd',
    meta: {
        label: '新增码表',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmpOpenIdForm')
},
{
    path: '/simple/qingTui/EmpOpenId/edit/:empOpenIdId',
    name: 'simple_qingTui_EmpOpenId_edit',
    meta: {
        label: '编辑码表',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmpOpenIdForm')
},
{
    path: '/simple/qingTui/EmpOpenId/display/:empOpenIdId',
    name: 'simple_qingTui_EmpOpenId_display',
    meta: {
        label: '查看码表',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmpOpenIdDisplay')
}
]
