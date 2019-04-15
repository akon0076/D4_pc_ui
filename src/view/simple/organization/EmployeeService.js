
import {simpleServer} from '@/tools/servers'

/**
 * 职员
 */
export class EmployeeService {
    // 分页查询列表
    static findEmployees (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findEmployees,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/Employee/findEmployees', body);
    }

    // 查询全部职员
    static findAllEmployees () {
      var httpMethod = 'GET';
      var body = simpleServer.getArgs(this.findAllEmployees,arguments,'GET');
      return simpleServer.connection(httpMethod, '/simple/organization/Employee/findAllEmployees', body);
    }

    //根据职员Id查询职员
    static findEmployee (employeeId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmployee ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Employee/findEmployee',body);
    }

    //为了编辑,根据职员Id查询职员
    static findEmployeeForEdit(employeeId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmployeeForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Employee/findEmployeeForEdit',body);
    }

    //为了查看,根据职员Id查询职员，所有外键字段的名称都已加载
    static findEmployeeForView(employeeId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmployeeForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Employee/findEmployeeForView',body);
    }

    //创建新的职员
    static createEmployee() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createEmployee,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Employee/createEmployee',body);
    }

    //保存职员
    static saveEmployee(employee) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveEmployee,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/Employee/saveEmployee', body);
    }

    //编辑职员
    static updateEmployee (employee) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateEmployee,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/Employee/updateEmployee', body);
    }

    //根据职员Id删除职员
    static deleteEmployee (employeeId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteEmployee,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Employee/deleteEmployee',body);
    }

    //为了查看,根据职员Id查询职员，只加载ID 和 名称
    static findEmployeesWithIdNameById(employeeId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmployeesWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Employee/findEmployeesWithIdNameById',body);
    }

    //为了查看,根据职员 名称 查询职员，只加载ID 和 名称
    static findEmployeesWithIdNameByName(employeeName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmployeesWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Employee/findEmployeesWithIdNameByName',body);
    }


}
