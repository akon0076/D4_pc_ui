import MemberRegistRoute from './regist/MemberRegistRoute'
import OrganizationRegistRoute from './regist/OrganizationRegistRoute'
import EmployeRegistRoute from './regist/EmployeRegistRoute'
import EmpOpenIdRoute from './qingTui/EmpOpenIdRoute'
import EmployeeRoute from './organization/EmployeeRoute'
import DepartmentRoute from './organization/DepartmentRoute'
import SystemConfigRoute from './systemConfig/SystemConfigRoute'
import AttachmentRoute from './attachment/AttachmentRoute'
import OperatorAndRoleRoute from './permission/OperatorAndRoleRoute'
import RoleAndPermissionRoute from './permission/RoleAndPermissionRoute'
import RoleRoute from './permission/RoleRoute'
import PermissionRoute from './permission/PermissionRoute'
import ModuleRoute from './permission/ModuleRoute'
import OperatorRoute from './permission/OperatorRoute'
import CodeTableRoute from './system/CodeTableRoute'
import fileRoute from './fileUpload/Route'
import OrganizationRoute from './organization/OrganizationRoute'
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
      ...OrganizationRoute,
      ...CodeTableRoute,
      ...OperatorRoute,
      ...ModuleRoute,
      ...PermissionRoute,
      ...RoleRoute,
      ...RoleAndPermissionRoute,
      ...OperatorAndRoleRoute,
      ...AttachmentRoute,
      ...SystemConfigRoute,
      ...DepartmentRoute,
      ...EmployeeRoute,
      ...fileRoute,
      ...EmpOpenIdRoute,
      ...EmployeRegistRoute,
      ...OrganizationRegistRoute,
         ...MemberRegistRoute,
    ]
  }
]
