

//学生管理

export default [
{
    path: '/simple/organization/TestStudent',
    name: 'simple_organization_TestStudent',
    meta: {
        label: '学生管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestStudentList')
},
{
    path: '/simple/organization/TestStudent/add',
    name: 'simple_organization_TestStudent_ddd',
    meta: {
        label: '新增学生',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestStudentForm')
},
{
    path: '/simple/organization/TestStudent/edit/:testStudentId',
    name: 'simple_organization_TestStudent_edit',
    meta: {
        label: '编辑学生',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestStudentForm')
},
{
    path: '/simple/organization/TestStudent/display/:testStudentId',
    name: 'simple_organization_TestStudent_display',
    meta: {
        label: '查看学生',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./TestStudentDisplay')
}
]
