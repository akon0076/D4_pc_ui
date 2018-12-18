import {simpleServer} from '@/tools/servers'

/**
 * 操作员角色
 */
export class OperatorAndRoleService {
  // 分页查询列表
  static findOperatorAndRoles(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findOperatorAndRoles, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/findOperatorAndRoles', body);
  }

  //根据操作员Id查询对应的角色
  static findOperatorAndRoleByOperatorIdAndOrganizationId(operatorId, organizationId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperatorAndRoleByOperatorIdAndOrganizationId, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/findOperatorAndRoleByOperatorIdAndOrganizationId', body);
  }


  //根据操作员角色Id查询操作员角色
  static findOperatorAndRole(operatorAndRoleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperatorAndRole, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/findOperatorAndRole', body);
  }

  //为了编辑,根据操作员角色Id查询操作员角色
  static findOperatorAndRoleForEdit(operatorAndRoleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperatorAndRoleForEdit, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/findOperatorAndRoleForEdit', body);
  }

  //为了查看,根据操作员角色Id查询操作员角色，所有外键字段的名称都已加载
  static findOperatorAndRoleForView(operatorAndRoleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperatorAndRoleForView, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/findOperatorAndRoleForView', body);
  }

  //创建新的操作员角色
  static createOperatorAndRole() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.createOperatorAndRole, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/createOperatorAndRole', body);
  }

  //保存操作员角色
  static saveOperatorAndRole(operatorAndRole) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.saveOperatorAndRole, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/saveOperatorAndRole', body);
  }

  //编辑操作员角色
  static updateOperatorAndRole(operatorAndRole) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.updateOperatorAndRole, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/updateOperatorAndRole', body);
  }

  //根据操作员角色Id删除操作员角色
  static deleteOperatorAndRole(operatorAndRoleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.deleteOperatorAndRole, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/deleteOperatorAndRole', body);
  }

  //为了查看,根据操作员角色Id查询操作员角色，只加载ID 和 名称
  static findOperatorAndRolesWithIdNameById(operatorAndRoleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperatorAndRolesWithIdNameById, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/findOperatorAndRolesWithIdNameById', body);
  }

  //为了查看,根据操作员角色 名称 查询操作员角色，只加载ID 和 名称
  static findOperatorAndRolesWithIdNameByName(operatorAndRoleName) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperatorAndRolesWithIdNameByName, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/OperatorAndRole/findOperatorAndRolesWithIdNameByName', body);
  }


}
