

//日志管理

export default [
{
    path: '/simple/log/Log',
    name: 'simple_log_Log',
    meta: {
        label: '日志管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./LogList')
},
{
    path: '/simple/log/Log/add',
    name: 'simple_log_Log_ddd',
    meta: {
        label: '新增日志',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./LogForm')
},
{
    path: '/simple/log/Log/edit/:logId',
    name: 'simple_log_Log_edit',
    meta: {
        label: '编辑日志',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./LogForm')
},
{
    path: '/simple/log/Log/display/:logId',
    name: 'simple_log_Log_display',
    meta: {
        label: '查看日志',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./LogDisplay')
}
]
