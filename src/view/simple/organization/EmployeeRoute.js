

//职员管理

export default [
{
    path: '/simple/organization/Employee',
    name: 'simple_organization_Employee',
    meta: {
        label: '职员管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmployeeList')
},
{
    path: '/simple/organization/Employee/add',
    name: 'simple_organization_Employee_ddd',
    meta: {
        label: '新增职员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmployeeForm')
},
{
    path: '/simple/organization/Employee/edit/:employeeId',
    name: 'simple_organization_Employee_edit',
    meta: {
        label: '编辑职员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmployeeForm')
},
{
    path: '/simple/organization/Employee/display/:employeeId',
    name: 'simple_organization_Employee_display',
    meta: {
        label: '查看职员',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./EmployeeDisplay')
}
]
