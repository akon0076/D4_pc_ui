import {generatorServer} from '../../tools/servers'
import {simpleServer} from '../../tools/servers'


/**
 * 代码生成
 */
export class GeneratorService {
  // 生成模型
  static generateModel(modelDefinition) {
    var body = generatorServer.getArgs(this.generateModel, arguments, 'GET');
    return generatorServer.connection('GET', 'generator/generateModel', body);
  }

  // 生成基础代码
  static generateBaseCode(className) {
    var body = generatorServer.getArgs(this.generateBaseCode, arguments, 'GET');
    return generatorServer.connection('GET', 'generator/generateBaseCode', body);
  }

  //生成方法代码
  static generateMethod(controllerMethodName) {
    var body = generatorServer.getArgs(this.generateMethod, arguments, 'GET');
    return generatorServer.connection('GET', 'generator/generateMethod', body);
  }

  //生成方法代码
  static createSuperOperator() {
    var body = generatorServer.getArgs(this.createSuperOperator, arguments, 'GET');
    return generatorServer.connection('GET', 'generator/createSuperOperator', body);
  }

  //异常测试
  static testException() {
    var body = generatorServer.getArgs(this.testException, arguments, 'GET');
    return generatorServer.connection('GET', 'generator/testException', body);
  }

  static fileUpload(data, files) {
    var fs = [];
    for (let i = 0; i < files.length; i++) {
      fs[i] = files[i].raw;
    }
    return simpleServer.connection("POST", '/simple/attachment/Attachment/saveAttachment', data, fs, 'files');
  }

  static download() {
    return simpleServer.connection("GET", '/simple/attachment/Attachment/download')
  }

  static findAllUploadedFilesByIdAndName(data) {
    return simpleServer.connection("GET", '/simple/attachment/Attachment/findAllUploadedFilesByIdAndName', {params: data})
  }

  static deleteUploadedFile(data) {
    return simpleServer.connection("GET", '/simple/attachment/Attachment/deleteUploadedFilesByIdAndName', {params: data})
  }

  static deleteFileById(data) {
    return simpleServer.connection("GET", '/simple/attachment/Attachment/deleteAttachment', {params: data});
  }

  //excel导出测试
  static excelExportTest(data) {
    // var body = simpleServer.getArgs(this.excelExportTest, arguments, 'GET');
    return simpleServer.connection('GET', '/simple/excel/excelExport', data, null, 'file', "getObj");
  }

  //excel导入测试
  static excelImportTest(file) {
    return simpleServer.connection('POST', '/simple/excel/excelImport', {}, file, 'file');
  }

  //word下载测试
  static wordExportTest() {
    var body = simpleServer.getArgs(this.wordExportTest, arguments, 'POST');
    return simpleServer.connection('POST', '/simple/word/wordExport', body);
  }

  static wordTemplateTest() {
    return simpleServer.connection('GET', '/simple/word/wordTemplate');
  }

}
