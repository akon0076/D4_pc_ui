import TaskConfigRoute from './task/TaskConfigRoute.js'
import TaskRoute from './task/TaskRoute.js'
import reportMesShowRoute from './report/reportShow/reportMesShowRoute.js'
import SystemConfigRoute from './systemConfig/SystemConfigRoute.js'
import CodeTableRoute from './system/CodeTableRoute.js'
import ModelFileRoute from './report/ModelFileRoute.js'
import OrganizationRegistRoute from './regist/OrganizationRegistRoute.js'
import MemberRegistRoute from './regist/MemberRegistRoute.js'
import EmployeRegistRoute from './regist/EmployeRegistRoute.js'
import EmpOpenIdRoute from './qingTui/EmpOpenIdRoute.js'
import RoleRoute from './permission/RoleRoute.js'
import RoleAndPermissionRoute from './permission/RoleAndPermissionRoute.js'
import PermissionRoute from './permission/PermissionRoute.js'
import OperatorRoute from './permission/OperatorRoute.js'
import OperatorAndRoleRoute from './permission/OperatorAndRoleRoute.js'
import ModuleRoute from './permission/ModuleRoute.js'
import OrganizationRoute from './organization/OrganizationRoute.js'
import EmployeeRoute from './organization/EmployeeRoute.js'
import DepartmentRoute from './organization/DepartmentRoute.js'
import Route from './fileUpload/Route.js'
import AttachmentRoute from './attachment/AttachmentRoute.js'


// import EmployeeManageRoute from './registrationAudit/EmployeeManageRoute'
// import OrganizationManageRoute from './registrationAudit/OrganizationManageRoute'

/**
 * 系统设置
 */
export default [
  {
    path: '/',
    component: () => import('../main/main'),
    meta: {
      modules: 'simple',
      label: '系统设置',
      icon: 'el-icon-message'
    },
    children: [
         ...AttachmentRoute,
     ...Route,
     ...DepartmentRoute,
     ...EmployeeRoute,
     ...OrganizationRoute,
     ...ModuleRoute,
     ...OperatorAndRoleRoute,
     ...OperatorRoute,
     ...PermissionRoute,
     ...RoleAndPermissionRoute,
     ...RoleRoute,
     ...EmpOpenIdRoute,
     ...EmployeRegistRoute,
     ...MemberRegistRoute,
     ...OrganizationRegistRoute,
     ...ModelFileRoute,
     ...CodeTableRoute,
     ...SystemConfigRoute,
         ...reportMesShowRoute,
         ...TaskRoute,
         ...TaskConfigRoute,
    ]
  }
]
