

//模板文件管理

export default [
    {
        path: '/simple/report/ModelFile',
        name: 'simple_report_ModelFile',
        meta: {
            label: '模板文件管理',
            icon: 'icon iconfont icon-fl-origin',
            requireAuth: true,
        },
        component: () => import('./ModelFileList')
    },
    {
        path: '/simple/report/ModelFile/add',
        name: 'simple_report_ModelFile_ddd',
        meta: {
            label: '新增模板文件',
            icon: 'icon iconfont icon-fl-origin',
            requireAuth: true,
        },
        component: () => import('./ModelFileForm')
    },
    {
        path: '/simple/report/ModelFile/edit/:modelFileId',
        name: 'simple_report_ModelFile_edit',
        meta: {
            label: '编辑模板文件',
            icon: 'icon iconfont icon-fl-origin',
            requireAuth: true,
        },
        component: () => import('./ModelFileForm')
    },
    {
        path: '/simple/report/ModelFile/display/:modelFileId',
        name: 'simple_report_ModelFile_display',
        meta: {
            label: '查看模板文件',
            icon: 'icon iconfont icon-fl-origin',
            requireAuth: true,
        },
        component: () => import('./ModelFileDisplay')
    }
]
