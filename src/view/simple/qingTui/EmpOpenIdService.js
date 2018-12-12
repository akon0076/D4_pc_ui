
import {simpleServer} from '@/tools/servers'

/**
 * 码表
 */
export class EmpOpenIdService {
    // 分页查询列表
    static findEmpOpenIds (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findEmpOpenIds,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/qingTui/EmpOpenId/findEmpOpenIds', body);
    }


    //根据码表Id查询码表
    static findEmpOpenId (empOpenIdId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmpOpenId ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/qingTui/EmpOpenId/findEmpOpenId',body);
    }

    //为了编辑,根据码表Id查询码表
    static findEmpOpenIdForEdit(empOpenIdId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmpOpenIdForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/qingTui/EmpOpenId/findEmpOpenIdForEdit',body);
    }

    //为了查看,根据码表Id查询码表，所有外键字段的名称都已加载
    static findEmpOpenIdForView(empOpenIdId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmpOpenIdForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/qingTui/EmpOpenId/findEmpOpenIdForView',body);
    }

    //创建新的码表
    static createEmpOpenId() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createEmpOpenId,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/qingTui/EmpOpenId/createEmpOpenId',body);
    }

    //保存码表
    static saveEmpOpenId(empOpenId) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveEmpOpenId,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/qingTui/EmpOpenId/saveEmpOpenId', body);
    }

    //编辑码表
    static updateEmpOpenId (empOpenId) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateEmpOpenId,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/qingTui/EmpOpenId/updateEmpOpenId', body);
    }

    //根据码表Id删除码表
    static deleteEmpOpenId (empOpenIdId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteEmpOpenId,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/qingTui/EmpOpenId/deleteEmpOpenId',body);
    }

    //为了查看,根据码表Id查询码表，只加载ID 和 名称
    static findEmpOpenIdsWithIdNameById(empOpenIdId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmpOpenIdsWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/qingTui/EmpOpenId/findEmpOpenIdsWithIdNameById',body);
    }

    //为了查看,根据码表 名称 查询码表，只加载ID 和 名称
    static findEmpOpenIdsWithIdNameByName(empOpenIdName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findEmpOpenIdsWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/qingTui/EmpOpenId/findEmpOpenIdsWithIdNameByName',body);
    }


}
