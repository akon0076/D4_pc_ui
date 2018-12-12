

//商家注册审核管理

export default [
{
    path: '/simple/regist/MemberRegist',
    name: 'simple_regist_MemberRegist',
    meta: {
        label: '商家注册审核管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./MemberRegistList')
},
{
    path: '/simple/regist/MemberRegist/add',
    name: 'simple_regist_MemberRegist_ddd',
    meta: {
        label: '新增商家注册审核',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./MemberRegistForm')
},
{
    path: '/simple/regist/MemberRegist/edit/:memberRegistId',
    name: 'simple_regist_MemberRegist_edit',
    meta: {
        label: '编辑商家注册审核',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./MemberRegistForm')
},
{
    path: '/simple/regist/MemberRegist/display/:memberRegistId',
    name: 'simple_regist_MemberRegist_display',
    meta: {
        label: '查看商家注册审核',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./MemberRegistDisplay')
}
]
