
import {simpleServer} from '@/tools/servers'

/**
 * 部门
 */
export class DepartmentService {
    // 分页查询列表
    static findDepartments (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findDepartments,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/Department/findDepartments', body);
    }

  static findAllDepartmentsByOrgId (orgId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findAllDepartmentsByOrgId,arguments,'GET');
    return simpleServer.connection(httpMethod, '/simple/organization/Department/findAllDepartmentsByOrgId', body);
  }


    //根据部门Id查询部门
    static findDepartment (departmentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findDepartment ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Department/findDepartment',body);
    }

    //为了编辑,根据部门Id查询部门
    static findDepartmentForEdit(departmentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findDepartmentForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Department/findDepartmentForEdit',body);
    }

    //为了查看,根据部门Id查询部门，所有外键字段的名称都已加载
    static findDepartmentForView(departmentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findDepartmentForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Department/findDepartmentForView',body);
    }

    //创建新的部门
    static createDepartment() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createDepartment,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Department/createDepartment',body);
    }

    //保存部门
    static saveDepartment(department) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveDepartment,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/Department/saveDepartment', body);
    }

    //编辑部门
    static updateDepartment (department) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateDepartment,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/Department/updateDepartment', body);
    }

    //根据部门Id删除部门
    static deleteDepartment (departmentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteDepartment,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Department/deleteDepartment',body);
    }

    //为了查看,根据部门Id查询部门，只加载ID 和 名称
    static findDepartmentsWithIdNameById(departmentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findDepartmentsWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Department/findDepartmentsWithIdNameById',body);
    }

    //为了查看,根据部门 名称 查询部门，只加载ID 和 名称
    static findDepartmentsWithIdNameByName(departmentName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findDepartmentsWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/Department/findDepartmentsWithIdNameByName',body);
    }


}
