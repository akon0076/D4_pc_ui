

//系统参数管理

export default [
{
    path: '/simple/system/SystemConfig',
    name: 'simple_system_SystemConfig',
    meta: {
        label: '系统参数管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./SystemConfigList')
},
{
    path: '/simple/system/SystemConfig/add',
    name: 'simple_system_SystemConfig_ddd',
    meta: {
        label: '新增系统参数',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./SystemConfigForm')
},
{
    path: '/simple/system/SystemConfig/edit/:systemConfigId',
    name: 'simple_system_SystemConfig_edit',
    meta: {
        label: '编辑系统参数',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./SystemConfigForm')
},
{
    path: '/simple/system/SystemConfig/display/:systemConfigId',
    name: 'simple_system_SystemConfig_display',
    meta: {
        label: '查看系统参数',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./SystemConfigDisplay')
}
]
