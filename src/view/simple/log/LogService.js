import {simpleServer} from '@/tools/servers'

/**
 * 日志
 */
export class LogService {
  // 分页查询列表
  static findLogs(pageDTO) {
    var httpMethod = 'POST';
    var body = simpleServer.getArgs(this.findLogs, arguments, 'POST');
    return simpleServer.connection(httpMethod, '/simple/log/Log/findLogs', body);
  }

  //根据日志Id查询日志
  static findLog(logId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findLog, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/log/Log/findLog', body);
  }

  //为了查看,根据日志Id查询日志，所有外键字段的名称都已加载
  static findLogForView(logId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findLogForView, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/log/Log/findLogForView', body);
  }

  //根据日志Id删除日志
  static deleteLog(logId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.deleteLog, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/log/Log/deleteLog', body);
  }

  //为了查看,根据日志Id查询日志，只加载ID 和 名称
  static findLogsWithIdNameById(logId) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findLogsWithIdNameById, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/log/Log/findLogsWithIdNameById', body);
  }

  //为了查看,根据日志 名称 查询日志，只加载ID 和 名称
  static findLogsWithIdNameByName(logName) {
    var httpMethod = 'GET';
    var body = simpleServer.getArgs(this.findLogsWithIdNameByName, arguments, 'GET');
    return simpleServer.connection(httpMethod, '/simple/log/Log/findLogsWithIdNameByName', body);
  }


}
