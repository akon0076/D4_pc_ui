

//定时任务管理

export default [
{
    path: '/simple/task/TaskConfig',
    name: 'simple_task_TaskConfig',
    meta: {
        label: '定时任务管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TaskConfigList')
},
{
    path: '/simple/task/TaskConfig/add',
    name: 'simple_task_TaskConfig_ddd',
    meta: {
        label: '新增定时任务',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TaskConfigForm')
},
{
    path: '/simple/task/TaskConfig/edit/:taskConfigId',
    name: 'simple_task_TaskConfig_edit',
    meta: {
        label: '编辑定时任务',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TaskConfigForm')
},
{
    path: '/simple/task/TaskConfig/display/:taskConfigId',
    name: 'simple_task_TaskConfig_display',
    meta: {
        label: '查看定时任务',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TaskConfigDisplay')
}
]
