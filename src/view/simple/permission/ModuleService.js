import {simpleServer} from '@/tools/servers'

/**
 * 模块
 */
export class ModuleService {
  // 获取全部模块树
  static findModuleTree(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findModuleTree, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findModuleTree', body);
  }

  // 分页查询列表
  static findModules(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findModules, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findModules', body);
  }

  // 查询全部模块
  static findAllTreeNode(modelType) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findAllTreeNode, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findAllTreeNode', body);
  }

  // 查询全部模块
  static findAllModules() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findModules, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findAllModules', body);
  }

  // 找到全部叶节点模块
  static findAllLeafModules() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findAllLeafModules, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findAllLeafModules', body);
  }

  // 找到全部非叶节点模块
  static findAllParentModules() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findAllParentModules, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findAllParentModules', body);
  }

  //根据模块Id查询模块
  static findModule(moduleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findModule, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findModule', body);
  }

  //为了编辑,根据模块Id查询模块
  static findModuleForEdit(moduleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findModuleForEdit, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findModuleForEdit', body);
  }

  //为了查看,根据模块Id查询模块，所有外键字段的名称都已加载
  static findModuleForView(moduleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findModuleForView, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findModuleForView', body);
  }

  //创建新的模块
  static createModule() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.createModule, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/createModule', body);
  }

  //保存模块
  static saveModule(module) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.saveModule, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/saveModule', body);
  }

  //编辑模块
  static updateModule(module) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.updateModule, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/updateModule', body);
  }

  //根据模块Id删除模块
  static deleteModule(moduleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.deleteModule, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/deleteModule', body);
  }

  //为了查看,根据模块Id查询模块，只加载ID 和 名称
  static findModulesWithIdNameById(moduleId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findModulesWithIdNameById, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findModulesWithIdNameById', body);
  }

  //为了查看,根据模块 名称 查询模块，只加载ID 和 名称
  static findModulesWithIdNameByName(moduleName) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findModulesWithIdNameByName, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Module/findModulesWithIdNameByName', body);
  }


}
