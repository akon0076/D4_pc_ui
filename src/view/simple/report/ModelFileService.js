
import {simpleServer} from '@/tools/servers'

/**
 * 模板文件
 */
export class ModelFileService {
    // 分页查询列表
    static findModelFiles (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findModelFiles,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/report/ModelFile/findModelFiles', body);
    }


    //根据模板文件Id查询模板文件
    static findModelFile (modelFileId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findModelFile ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/report/ModelFile/findModelFile',body);
    }

    //为了编辑,根据模板文件Id查询模板文件
    static findModelFileForEdit(modelFileId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findModelFileForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/report/ModelFile/findModelFileForEdit',body);
    }

    //为了查看,根据模板文件Id查询模板文件，所有外键字段的名称都已加载
    static findModelFileForView(modelFileId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findModelFileForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/report/ModelFile/findModelFileForView',body);
    }

    //创建新的模板文件
    static createModelFile() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createModelFile,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/report/ModelFile/createModelFile',body);
    }

    //保存模板文件
    static saveModelFile(modelFile) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveModelFile,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/report/ModelFile/saveModelFile', body);
    }

    //编辑模板文件
    static updateModelFile (modelFile) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateModelFile,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/report/ModelFile/updateModelFile', body);
    }

    //根据模板文件Id删除模板文件
    static deleteModelFile (modelFileId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteModelFile,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/report/ModelFile/deleteModelFile',body);
    }

    //为了查看,根据模板文件Id查询模板文件，只加载ID 和 名称
    static findModelFilesWithIdNameById(modelFileId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findModelFilesWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/report/ModelFile/findModelFilesWithIdNameById',body);
    }

    //为了查看,根据模板文件 名称 查询模板文件，只加载ID 和 名称
    static findModelFilesWithIdNameByName(modelFileName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findModelFilesWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/report/ModelFile/findModelFilesWithIdNameByName',body);
    }


}
