
import {simpleServer} from '@/tools/servers'

/**
 * 商家注册审核
 */
export class MemberRegistService {
    // 分页查询列表
    static findMemberRegists (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findMemberRegists,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/regist/MemberRegist/findMemberRegists', body);
    }


    //根据商家注册审核Id查询商家注册审核
    static findMemberRegist (memberRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findMemberRegist ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/MemberRegist/findMemberRegist',body);
    }

    //为了编辑,根据商家注册审核Id查询商家注册审核
    static findMemberRegistForEdit(memberRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findMemberRegistForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/MemberRegist/findMemberRegistForEdit',body);
    }

    //为了查看,根据商家注册审核Id查询商家注册审核，所有外键字段的名称都已加载
    static findMemberRegistForView(memberRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findMemberRegistForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/MemberRegist/findMemberRegistForView',body);
    }

    //创建新的商家注册审核
    static createMemberRegist() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createMemberRegist,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/MemberRegist/createMemberRegist',body);
    }

    //保存商家注册审核
    static saveMemberRegist(memberRegist) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveMemberRegist,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/regist/MemberRegist/saveMemberRegist', body);
    }

    //编辑商家注册审核
    static updateMemberRegist (memberRegist) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateMemberRegist,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/regist/MemberRegist/updateMemberRegist', body);
    }

    //根据商家注册审核Id删除商家注册审核
    static deleteMemberRegist (memberRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteMemberRegist,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/MemberRegist/deleteMemberRegist',body);
    }

    //为了查看,根据商家注册审核Id查询商家注册审核，只加载ID 和 名称
    static findMemberRegistsWithIdNameById(memberRegistId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findMemberRegistsWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/MemberRegist/findMemberRegistsWithIdNameById',body);
    }

    //为了查看,根据商家注册审核 名称 查询商家注册审核，只加载ID 和 名称
    static findMemberRegistsWithIdNameByName(memberRegistName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findMemberRegistsWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/regist/MemberRegist/findMemberRegistsWithIdNameByName',body);
    }


}
