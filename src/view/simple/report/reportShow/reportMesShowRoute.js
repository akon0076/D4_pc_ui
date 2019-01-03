

//统计报表展示

export default [
  {
      path: '/simple/report/reportMesShow',
      name: 'simple_report_reportMesShow',
      meta: {
        label: '统计报表',
        icon: 'icon iconfont icon-fl-origin',
        requireAuth: true,
      },
      component: () => import('./reportMesShow')
  }


]
