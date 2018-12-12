import {simpleServer} from '@/tools/servers'

/**
 * 角色权限点
 */
export class RoleAndPermissionService {
  // 分页查询列表
  static findRoleAndPermissions(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findRoleAndPermissions, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/findRoleAndPermissions', body);
  }

  //根据角色Id查询角色权限点
  static findRoleAndPermissionByRoleId(roleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRoleAndPermissionByRoleId, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/findRoleAndPermissionByRoleId', body);
  }


  //根据角色权限点Id查询角色权限点
  static findRoleAndPermission(roleAndPermissionId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRoleAndPermission, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/findRoleAndPermission', body);
  }

  //为了编辑,根据角色权限点Id查询角色权限点
  static findRoleAndPermissionForEdit(roleAndPermissionId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRoleAndPermissionForEdit, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/findRoleAndPermissionForEdit', body);
  }

  //为了查看,根据角色权限点Id查询角色权限点，所有外键字段的名称都已加载
  static findRoleAndPermissionForView(roleAndPermissionId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRoleAndPermissionForView, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/findRoleAndPermissionForView', body);
  }

  //创建新的角色权限点
  static createRoleAndPermission() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.createRoleAndPermission, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/createRoleAndPermission', body);
  }

  //保存角色权限点
  static saveRoleAndPermission(roleAndPermission) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.saveRoleAndPermission, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/saveRoleAndPermission', body);
  }

  //编辑角色权限点
  static updateRoleAndPermission(roleAndPermission) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.updateRoleAndPermission, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/updateRoleAndPermission', body);
  }

  //根据角色权限点Id删除角色权限点
  static deleteRoleAndPermission(roleAndPermissionId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.deleteRoleAndPermission, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/deleteRoleAndPermission', body);
  }

  //为了查看,根据角色权限点Id查询角色权限点，只加载ID 和 名称
  static findRoleAndPermissionsWithIdNameById(roleAndPermissionId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRoleAndPermissionsWithIdNameById, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/findRoleAndPermissionsWithIdNameById', body);
  }

  //为了查看,根据角色权限点 名称 查询角色权限点，只加载ID 和 名称
  static findRoleAndPermissionsWithIdNameByName(roleAndPermissionName) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRoleAndPermissionsWithIdNameByName, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/RoleAndPermission/findRoleAndPermissionsWithIdNameByName', body);
  }


}
