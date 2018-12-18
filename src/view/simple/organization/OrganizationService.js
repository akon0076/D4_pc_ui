import {simpleServer} from '@/tools/servers'

/**
 * 单位
 */
export class OrganizationService {
  // 分页查询列表
  static findOrganizations(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findOrganizations, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/findOrganizations', body);
  }

  // 查询所有单位
  static findAllOrganizations() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findAllOrganizations, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/findAllOrganizations', body);
  }


  //根据单位Id查询单位
  static findOrganization(organizationId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOrganization, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/findOrganization', body);
  }

  //为了编辑,根据单位Id查询单位
  static findOrganizationForEdit(organizationId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOrganizationForEdit, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/findOrganizationForEdit', body);
  }

  //为了查看,根据单位Id查询单位，所有外键字段的名称都已加载
  static findOrganizationForView(organizationId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOrganizationForView, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/findOrganizationForView', body);
  }

  //创建新的单位
  static createOrganization() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.createOrganization, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/createOrganization', body);
  }

  //保存单位
  static saveOrganization(organization) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.saveOrganization, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/saveOrganization', body);
  }

  //编辑单位
  static updateOrganization(organization) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.updateOrganization, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/updateOrganization', body);
  }

  //根据单位Id删除单位
  static deleteOrganization(organizationId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.deleteOrganization, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/deleteOrganization', body);
  }

  //为了查看,根据单位Id查询单位，只加载ID 和 名称
  static findOrganizationsWithIdNameById(organizationId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOrganizationsWithIdNameById, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/findOrganizationsWithIdNameById', body);
  }

  //为了查看,根据单位 名称 查询单位，只加载ID 和 名称
  static findOrganizationsWithIdNameByName(organizationName) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOrganizationsWithIdNameByName, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/organization/Organization/findOrganizationsWithIdNameByName', body);
  }


}
