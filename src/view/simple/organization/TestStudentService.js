
import {simpleServer} from '@/tools/servers'

/**
 * 学生
 */
export class TestStudentService {
    // 分页查询列表
    static findTestStudents (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findTestStudents,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/TestStudent/findTestStudents', body);
    }


    //根据学生Id查询学生
    static findTestStudent (testStudentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestStudent ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestStudent/findTestStudent',body);
    }

    //为了编辑,根据学生Id查询学生
    static findTestStudentForEdit(testStudentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestStudentForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestStudent/findTestStudentForEdit',body);
    }

    //为了查看,根据学生Id查询学生，所有外键字段的名称都已加载
    static findTestStudentForView(testStudentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestStudentForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestStudent/findTestStudentForView',body);
    }

    //创建新的学生
    static createTestStudent() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createTestStudent,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestStudent/createTestStudent',body);
    }

    //保存学生
    static saveTestStudent(testStudent) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveTestStudent,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/TestStudent/saveTestStudent', body);
    }

    //编辑学生
    static updateTestStudent (testStudent) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateTestStudent,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/TestStudent/updateTestStudent', body);
    }

    //根据学生Id删除学生
    static deleteTestStudent (testStudentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteTestStudent,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestStudent/deleteTestStudent',body);
    }

    //为了查看,根据学生Id查询学生，只加载ID 和 名称
    static findTestStudentsWithIdNameById(testStudentId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestStudentsWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestStudent/findTestStudentsWithIdNameById',body);
    }

    //为了查看,根据学生 名称 查询学生，只加载ID 和 名称
    static findTestStudentsWithIdNameByName(testStudentName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestStudentsWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestStudent/findTestStudentsWithIdNameByName',body);
    }


}
