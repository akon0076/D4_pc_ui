
import {simpleServer} from '@/tools/servers'

/**
 * 人员注册
 */
export class EmployeRegistService {
    // 分页查询列表
    static findEmployeRegists (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findEmployeRegists,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/regist/EmployeRegist/findEmployeRegists', body);
    }


    //根据人员注册Id查询人员注册
    static findEmployeRegist (employeRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmployeRegist ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/EmployeRegist/findEmployeRegist',body);
    }

    //为了编辑,根据人员注册Id查询人员注册
    static findEmployeRegistForEdit(employeRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmployeRegistForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/EmployeRegist/findEmployeRegistForEdit',body);
    }

    //为了查看,根据人员注册Id查询人员注册，所有外键字段的名称都已加载
    static findEmployeRegistForView(employeRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmployeRegistForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/EmployeRegist/findEmployeRegistForView',body);
    }

    //创建新的人员注册
    static createEmployeRegist() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createEmployeRegist,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/EmployeRegist/createEmployeRegist',body);
    }

    //保存人员注册
    static saveEmployeRegist(employeRegist) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveEmployeRegist,arguments,'POST');
        return simpleServer.connection(httpMethod, '/Login/saveEmployeRegist', body);
    }

    //编辑人员注册
    static updateEmployeRegist (employeRegist) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateEmployeRegist,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/regist/EmployeRegist/updateEmployeRegist', body);
    }

    //根据人员注册Id删除人员注册
    static deleteEmployeRegist (employeRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteEmployeRegist,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/EmployeRegist/deleteEmployeRegist',body);
    }

    //为了查看,根据人员注册Id查询人员注册，只加载ID 和 名称
    static findEmployeRegistsWithIdNameById(employeRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmployeRegistsWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/EmployeRegist/findEmployeRegistsWithIdNameById',body);
    }

    //为了查看,根据人员注册 名称 查询人员注册，只加载ID 和 名称
    static findEmployeRegistsWithIdNameByName(employeRegistName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmployeRegistsWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/EmployeRegist/findEmployeRegistsWithIdNameByName',body);
    }

    //发送邮箱验证码，返回验证码
    static sendEmailCode(toEmail) {
      var httpMethod = 'GET';
      var body = simpleServer.getArgs(this.sendEmailCode ,arguments,'GET');
      return simpleServer.connection(httpMethod, '/Login/sendEmailCode',body);
    }
}
