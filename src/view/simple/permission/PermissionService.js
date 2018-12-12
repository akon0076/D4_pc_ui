import {simpleServer} from '@/tools/servers'

/**
 * 权限点
 */
export class PermissionService {
  // 查询所有权限
  static findAllPermissions() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findAllPermissions, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/findAllPermissions', body);
  }

  // 分页查询列表
  static findPermissions(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findPermissions, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/findPermissions', body);
  }


  //根据权限点Id查询权限点
  static findPermission(permissionId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findPermission, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/findPermission', body);
  }

  //为了编辑,根据权限点Id查询权限点
  static findPermissionForEdit(permissionId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findPermissionForEdit, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/findPermissionForEdit', body);
  }

  //为了查看,根据权限点Id查询权限点，所有外键字段的名称都已加载
  static findPermissionForView(permissionId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findPermissionForView, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/findPermissionForView', body);
  }

  //创建新的权限点
  static createPermission() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.createPermission, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/createPermission', body);
  }

  //保存权限点
  static savePermission(permission) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.savePermission, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/savePermission', body);
  }

  //编辑权限点
  static updatePermission(permission) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.updatePermission, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/updatePermission', body);
  }

  //根据权限点Id删除权限点
  static deletePermission(permissionId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.deletePermission, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/deletePermission', body);
  }

  //为了查看,根据权限点Id查询权限点，只加载ID 和 名称
  static findPermissionsWithIdNameById(permissionId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findPermissionsWithIdNameById, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/findPermissionsWithIdNameById', body);
  }

  //为了查看,根据权限点 名称 查询权限点，只加载ID 和 名称
  static findPermissionsWithIdNameByName(permissionName) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findPermissionsWithIdNameByName, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Permission/findPermissionsWithIdNameByName', body);
  }


}
