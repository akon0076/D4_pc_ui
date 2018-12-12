

//人员注册管理

export default [
{
    path: '/simple/regist/EmployeRegist',
    name: 'simple_regist_EmployeRegist',
    meta: {
        label: '人员注册管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmployeRegistList')
},
{
    path: '/simple/regist/EmployeRegist/add',
    name: 'simple_regist_EmployeRegist_ddd',
    meta: {
        label: '新增人员注册',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmployeRegistForm')
},
{
    path: '/simple/regist/EmployeRegist/edit/:employeRegistId',
    name: 'simple_regist_EmployeRegist_edit',
    meta: {
        label: '编辑人员注册',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmployeRegistForm')
},
{
    path: '/simple/regist/EmployeRegist/display/:employeRegistId',
    name: 'simple_regist_EmployeRegist_display',
    meta: {
        label: '查看人员注册',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmployeRegistDisplay')
}
]
