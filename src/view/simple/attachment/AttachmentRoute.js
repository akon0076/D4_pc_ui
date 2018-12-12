

//附件管理

export default [
{
    path: '/simple/attachment/Attachment',
    name: 'simple_attachment_Attachment',
    meta: {
        label: '附件管理',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./AttachmentList')
},
{
    path: '/simple/attachment/Attachment/add',
    name: 'simple_attachment_Attachment_ddd',
    meta: {
        label: '新增附件',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./AttachmentForm')
},
{
    path: '/simple/attachment/Attachment/edit/:attachmentId',
    name: 'simple_attachment_Attachment_edit',
    meta: {
        label: '编辑附件',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./AttachmentForm')
},
{
    path: '/simple/attachment/Attachment/display/:attachmentId',
    name: 'simple_attachment_Attachment_display',
    meta: {
        label: '查看附件',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
    },
    component: () => import('./AttachmentDisplay')
}
]
