
import {simpleServer} from '@/tools/servers'

/**
 * 单位注册
 */
export class OrganizationRegistService {
    // 分页查询列表
    static findOrganizationRegists (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findOrganizationRegists,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/regist/OrganizationRegist/findOrganizationRegists', body);
    }


    //根据单位注册Id查询单位注册
    static findOrganizationRegist (organizationRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findOrganizationRegist ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/OrganizationRegist/findOrganizationRegist',body);
    }

    //为了编辑,根据单位注册Id查询单位注册
    static findOrganizationRegistForEdit(organizationRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findOrganizationRegistForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/OrganizationRegist/findOrganizationRegistForEdit',body);
    }

    //为了查看,根据单位注册Id查询单位注册，所有外键字段的名称都已加载
    static findOrganizationRegistForView(organizationRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findOrganizationRegistForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/OrganizationRegist/findOrganizationRegistForView',body);
    }

    //创建新的单位注册
    static createOrganizationRegist() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createOrganizationRegist,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/OrganizationRegist/createOrganizationRegist',body);
    }

    //保存单位注册
    static saveOrganizationRegist(organizationRegist) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveOrganizationRegist,arguments,'POST');
        return simpleServer.connection(httpMethod, '/Login/saveOrganizationRegist', body);
    }

    //编辑单位注册
    static updateOrganizationRegist (organizationRegist) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateOrganizationRegist,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/regist/OrganizationRegist/updateOrganizationRegist', body);
    }

    //根据单位注册Id删除单位注册
    static deleteOrganizationRegist (organizationRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteOrganizationRegist,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/OrganizationRegist/deleteOrganizationRegist',body);
    }

    //为了查看,根据单位注册Id查询单位注册，只加载ID 和 名称
    static findOrganizationRegistsWithIdNameById(organizationRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findOrganizationRegistsWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/OrganizationRegist/findOrganizationRegistsWithIdNameById',body);
    }

    //为了查看,根据单位注册 名称 查询单位注册，只加载ID 和 名称
    static findOrganizationsWithIdNameByName(organizationName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findOrganizationsWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/Login/findOrganizationsWithIdNameByName',body);
    }

    //上传文件
    static saveFile(data,files) {
      var httpMethod = 'POST';
      var body = simpleServer.getArgs(this.saveFile,arguments,'POST');
      return simpleServer.connection(httpMethod, '/Login/saveAttachment', data,files,'files');
    }
}
