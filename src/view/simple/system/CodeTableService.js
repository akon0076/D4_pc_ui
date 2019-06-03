import {simpleServer} from '@/tools/servers'

/**
 * 码表
 */
export class CodeTableService {
  // 分页查询列表
  static findCodeTables(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findCodeTables, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/findCodeTables', body);
  }

  // 找到全部码表树
  static findAllCodeTablesTree(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findAllCodeTablesTree, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/findAllCodeTablesTree', body);
  }

  //查询全部码表类型
  static findAllCodeType() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findAllCodeType, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/findAllCodeType', body);
  }

  //根据码表Id查询码表
  static findCodeTable(uuid) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findCodeTable, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/findCodeTable', body);
  }

  //为了编辑,根据码表Id查询码表
  static findCodeTableForEdit(codeTableId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findCodeTableForEdit, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/findCodeTableForEdit', body);
  }

  //为了查看,根据码表Id查询码表，所有外键字段的名称都已加载
  static findCodeTableForView(codeTableId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findCodeTableForView, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/findCodeTableForView', body);
  }

  //创建新的码表
  static createCodeTable() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.createCodeTable, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/createCodeTable', body);
  }

  //保存码表
  static saveCodeTable(codeTable) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.saveCodeTable, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/saveCodeTable', body);
  }

  //保存保存组织单位
  static saveOrganization(codeTable) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.saveOrganization, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/saveOrganization', body);
  }

  //新增码表选项
  static saveOption(codeTable) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.saveOption, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/saveOption', body);
  }

  //编辑码表
  static updateCodeTable(codeTable) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.updateCodeTable, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/updateCodeTable', body);
  }

  //编辑码表选项
  static updateCodeTableOption(codeTable) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.updateCodeTableOption, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/updateCodeTableOption', body);
  }

  //根据码表Id删除码表
  static deleteCodeTable(codeTableId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.deleteCodeTable, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/deleteCodeTable', body);
  }

  //为了查看,根据码表Id查询码表，只加载ID 和 名称
  static findCodeTablesWithIdNameById(codeTableId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findCodeTablesWithIdNameById, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/findCodeTablesWithIdNameById', body);
  }

  //为了查看,根据码表 名称 查询码表，只加载ID 和 名称
  static findCodeTablesWithIdNameByName(codeTableName) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findCodeTablesWithIdNameByName, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/system/CodeTable/findCodeTablesWithIdNameByName', body);
  }


}
