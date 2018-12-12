import {simpleServer} from '@/tools/servers'

/**
 * 角色
 */
export class RoleService {
  // 查询所有角色
  static findAllRoles() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findAllRoles, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/findAllRoles', body);
  }

  // 分页查询列表
  static findRoles(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findRoles, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/findRoles', body);
  }


  //根据角色Id查询角色
  static findRole(roleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRole, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/findRole', body);
  }

  //为了编辑,根据角色Id查询角色
  static findRoleForEdit(roleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRoleForEdit, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/findRoleForEdit', body);
  }

  //为了查看,根据角色Id查询角色，所有外键字段的名称都已加载
  static findRoleForView(roleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRoleForView, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/findRoleForView', body);
  }

  //创建新的角色
  static createRole() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.createRole, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/createRole', body);
  }

  //保存角色
  static saveRole(role) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.saveRole, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/saveRole', body);
  }

  //编辑角色
  static updateRole(role) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.updateRole, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/updateRole', body);
  }

  //根据角色Id删除角色
  static deleteRole(roleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.deleteRole, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/deleteRole', body);
  }

  //为了查看,根据角色Id查询角色，只加载ID 和 名称
  static findRolesWithIdNameById(roleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRolesWithIdNameById, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/findRolesWithIdNameById', body);
  }

  //为了查看,根据角色 名称 查询角色，只加载ID 和 名称
  static findRolesWithIdNameByName(roleName) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findRolesWithIdNameByName, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Role/findRolesWithIdNameByName', body);
  }


}
