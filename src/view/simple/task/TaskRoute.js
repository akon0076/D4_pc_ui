

//定时任务管理

export default [
{
    path: '/simple/task/Task',
    name: 'simple_task_Task',
    meta: {
        label: '定时任务管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TaskList')
},
{
    path: '/simple/task/Task/add',
    name: 'simple_task_Task_ddd',
    meta: {
        label: '新增定时任务',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TaskForm')
},
{
    path: '/simple/task/Task/edit/:taskId',
    name: 'simple_task_Task_edit',
    meta: {
        label: '编辑定时任务',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TaskForm')
},
{
    path: '/simple/task/Task/display/:taskId',
    name: 'simple_task_Task_display',
    meta: {
        label: '查看定时任务',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TaskDisplay')
}
]
