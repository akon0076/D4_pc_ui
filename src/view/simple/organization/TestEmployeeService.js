
import {simpleServer} from '@/tools/servers'

/**
 * 测试表单
 */
export class TestEmployeeService {
    // 分页查询列表
    static findTestEmployees (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findTestEmployees,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/TestEmployee/findTestEmployees', body);
    }


    //根据测试表单Id查询测试表单
    static findTestEmployee (testEmployeeId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestEmployee ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestEmployee/findTestEmployee',body);
    }

    //为了编辑,根据测试表单Id查询测试表单
    static findTestEmployeeForEdit(testEmployeeId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestEmployeeForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestEmployee/findTestEmployeeForEdit',body);
    }

    //为了查看,根据测试表单Id查询测试表单，所有外键字段的名称都已加载
    static findTestEmployeeForView(testEmployeeId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestEmployeeForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestEmployee/findTestEmployeeForView',body);
    }

    //创建新的测试表单
    static createTestEmployee() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createTestEmployee,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestEmployee/createTestEmployee',body);
    }

    //保存测试表单
    static saveTestEmployee(testEmployee) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveTestEmployee,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/TestEmployee/saveTestEmployee', body);
    }

    //编辑测试表单
    static updateTestEmployee (testEmployee) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateTestEmployee,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/TestEmployee/updateTestEmployee', body);
    }

    //根据测试表单Id删除测试表单
    static deleteTestEmployee (testEmployeeId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteTestEmployee,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestEmployee/deleteTestEmployee',body);
    }

    //为了查看,根据测试表单Id查询测试表单，只加载ID 和 名称
    static findTestEmployeesWithIdNameById(testEmployeeId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestEmployeesWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestEmployee/findTestEmployeesWithIdNameById',body);
    }

    //为了查看,根据测试表单 名称 查询测试表单，只加载ID 和 名称
    static findTestEmployeesWithIdNameByName(testEmployeeName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestEmployeesWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestEmployee/findTestEmployeesWithIdNameByName',body);
    }


}
