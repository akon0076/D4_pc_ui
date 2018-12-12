

//系统参数管理

export default [
{
    path: '/simple/systemConfig/SystemConfig',
    name: 'simple_systemConfig_SystemConfig',
    meta: {
        label: '系统参数管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./SystemConfigList')
},
{
    path: '/simple/systemConfig/SystemConfig/add',
    name: 'simple_systemConfig_SystemConfig_ddd',
    meta: {
        label: '新增系统参数',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./SystemConfigForm')
},
{
    path: '/simple/systemConfig/SystemConfig/edit/:systemConfigId',
    name: 'simple_systemConfig_SystemConfig_edit',
    meta: {
        label: '编辑系统参数',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./SystemConfigForm')
},
{
    path: '/simple/systemConfig/SystemConfig/display/:systemConfigId',
    name: 'simple_systemConfig_SystemConfig_display',
    meta: {
        label: '查看系统参数',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./SystemConfigDisplay')
}
]
