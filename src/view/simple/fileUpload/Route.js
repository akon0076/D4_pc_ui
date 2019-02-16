

//

export default [
{
    path: '/simple/file',
    name: 'file',
    meta: {
        label: '文件上传',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true
    },
    component: () => import('./index')
},

]
