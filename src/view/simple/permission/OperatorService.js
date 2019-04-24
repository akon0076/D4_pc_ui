import {simpleServer} from '@/tools/servers'
import crypto from 'crypto';

/**
 * 操作员
 */
export class OperatorService {
  // 分页查询列表
  static findOperators(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findOperators, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/findOperators', body);
  }


  //根据操作员Id查询操作员
  static findOperator(operatorId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperator, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/findOperator', body);
  }

  //为了编辑,根据操作员Id查询操作员
  static findOperatorForEdit(operatorId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperatorForEdit, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/findOperatorForEdit', body);
  }

  //为了查看,根据操作员Id查询操作员，所有外键字段的名称都已加载
  static findOperatorForView(operatorId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperatorForView, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/findOperatorForView', body);
  }

  //创建新的操作员
  static createOperator() {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.createOperator, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/createOperator', body);
  }

  //保存操作员
  static saveOperator(operator) {
    let md5 = crypto.createHash("md5");
    md5.update(operator.passWord);
    let password = md5.digest('hex');
    operator.passWord = password
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.saveOperator, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/saveOperator', body);
  }

  //编辑操作员
  static updateOperator(operator) {
    let md5 = crypto.createHash("md5");
    md5.update(operator.passWord);
    let password = md5.digest('hex');
    operator.passWord = password
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.updateOperator, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/updateOperator', body);
  }

  //根据操作员Id删除操作员
  static deleteOperator(operatorId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.deleteOperator, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/deleteOperator', body);
  }

  //为了查看,根据操作员Id查询操作员，只加载ID 和 名称
  static findOperatorsWithIdNameById(operatorId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperatorsWithIdNameById, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/findOperatorsWithIdNameById', body);
  }

  //为了查看,根据操作员 名称 查询操作员，只加载ID 和 名称
  static findOperatorsWithIdNameByName(operatorName) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findOperatorsWithIdNameByName, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/findOperatorsWithIdNameByName', body);
  }

  //修改密码
  static changePassword(form) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.changePassword, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/permission/Operator/changePassword', body);
  }


}
