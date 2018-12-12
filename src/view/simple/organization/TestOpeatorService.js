
import {simpleServer} from '@/tools/servers'

/**
 * 测试操作员
 */
export class TestOpeatorService {
    // 分页查询列表
    static findTestOpeators (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findTestOpeators,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/TestOpeator/findTestOpeators', body);
    }


    //根据测试操作员Id查询测试操作员
    static findTestOpeator (testOpeatorId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestOpeator ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestOpeator/findTestOpeator',body);
    }

    //为了编辑,根据测试操作员Id查询测试操作员
    static findTestOpeatorForEdit(testOpeatorId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestOpeatorForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestOpeator/findTestOpeatorForEdit',body);
    }

    //为了查看,根据测试操作员Id查询测试操作员，所有外键字段的名称都已加载
    static findTestOpeatorForView(testOpeatorId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestOpeatorForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestOpeator/findTestOpeatorForView',body);
    }

    //创建新的测试操作员
    static createTestOpeator() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createTestOpeator,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestOpeator/createTestOpeator',body);
    }

    //保存测试操作员
    static saveTestOpeator(testOpeator) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveTestOpeator,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/TestOpeator/saveTestOpeator', body);
    }

    //编辑测试操作员
    static updateTestOpeator (testOpeator) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateTestOpeator,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/organization/TestOpeator/updateTestOpeator', body);
    }

    //根据测试操作员Id删除测试操作员
    static deleteTestOpeator (testOpeatorId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteTestOpeator,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestOpeator/deleteTestOpeator',body);
    }

    //为了查看,根据测试操作员Id查询测试操作员，只加载ID 和 名称
    static findTestOpeatorsWithIdNameById(testOpeatorId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestOpeatorsWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestOpeator/findTestOpeatorsWithIdNameById',body);
    }

    //为了查看,根据测试操作员 名称 查询测试操作员，只加载ID 和 名称
    static findTestOpeatorsWithIdNameByName(testOpeatorName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTestOpeatorsWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/organization/TestOpeator/findTestOpeatorsWithIdNameByName',body);
    }


}
