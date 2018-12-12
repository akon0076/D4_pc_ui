
import {simpleServer} from '@/tools/servers'

/**
 * 系统参数
 */
export class SystemConfigService {
    // 分页查询列表
    static findSystemConfigs (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findSystemConfigs,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/systemConfig/SystemConfig/findSystemConfigs', body);
    }


    //根据系统参数Id查询系统参数
    static findSystemConfig (systemConfigId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findSystemConfig ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/systemConfig/SystemConfig/findSystemConfig',body);
    }

    //为了编辑,根据系统参数Id查询系统参数
    static findSystemConfigForEdit(systemConfigId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findSystemConfigForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/systemConfig/SystemConfig/findSystemConfigForEdit',body);
    }

    //为了查看,根据系统参数Id查询系统参数，所有外键字段的名称都已加载
    static findSystemConfigForView(systemConfigId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findSystemConfigForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/systemConfig/SystemConfig/findSystemConfigForView',body);
    }

    //创建新的系统参数
    static createSystemConfig() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createSystemConfig,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/systemConfig/SystemConfig/createSystemConfig',body);
    }

    //保存系统参数
    static saveSystemConfig(systemConfig,fileList) {
        var httpMethod = 'POST';
 /*       var body = simpleServer.getArgs(this.saveSystemConfig,arguments,'POST');*/
        var files=[];
         systemConfig.eid=1;//无其他作用,仅作验证
        for(let i=0;i<fileList.length;i++){
          files[i]=fileList[i].raw;
        }
        return simpleServer.connection(httpMethod, '/simple/systemConfig/SystemConfig/saveSystemConfig',systemConfig,files);
    }

    //编辑系统参数
    static updateSystemConfig (systemConfig,fileList) {
        var httpMethod = 'POST';
/*        var body = simpleServer.getArgs(this.updateSystemConfig,arguments,'POST');*/
      var files=[];
      let j=0;
      for(let i=0;i<fileList.length;i++){
        if(fileList[i].id){
         /*Ignore*/
        }
        else{
          files[j++]=fileList[i].raw;
        }

      }
        return simpleServer.connection(httpMethod, '/simple/systemConfig/SystemConfig/updateSystemConfig', systemConfig,files);
    }

    //根据系统参数Id删除系统参数
    static deleteSystemConfig (systemConfigId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteSystemConfig,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/systemConfig/SystemConfig/deleteSystemConfig',body);
    }

    //为了查看,根据系统参数Id查询系统参数，只加载ID 和 名称
    static findSystemConfigsWithIdNameById(systemConfigId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findSystemConfigsWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/systemConfig/SystemConfig/findSystemConfigsWithIdNameById',body);
    }

    //为了查看,根据系统参数 名称 查询系统参数，只加载ID 和 名称
    static findSystemConfigsWithIdNameByName(systemConfigName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findSystemConfigsWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/systemConfig/SystemConfig/findSystemConfigsWithIdNameByName',body);
    }
}
