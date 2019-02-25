import {taskServer} from '@/tools/servers'

export class TaskServer {


  static findTaskList (id) {
    var httpMethod = 'GET';
    var body = taskServer.getArgs(this.findTaskList,arguments,'GET');
    return taskServer.connection(httpMethod, '/test/getSimpleTaskList',body);
  }
  //新增定时任务
  static addSchedulerJob(simpleTask) {
    var httpMethod = 'POST';
    var body = taskServer.getArgs(this.addSchedulerJob,arguments,'POST');
    return taskServer.connection(httpMethod, '/test/addSchedulerJob',body);
  }
  // 读取定时配置配置
  static getTaskConfigList () {
    return taskServer.connection('GET', '/test/getTaskConfigList');
  }
  // 启动任务
  static startTask (id) {
    var httpMethod = 'GET';
    var body = taskServer.getArgs(this.startTask,arguments,'GET');
    return taskServer.connection(httpMethod, '/test/startSchedulerJob',body);
  }
  // 暂停任务
  static pauseTask (id) {
    var httpMethod = 'GET';
    var body = taskServer.getArgs(this.pauseTask,arguments,'GET');
    return taskServer.connection(httpMethod, '/test/pauseSchedulerJob',body);
  }
  // 恢复任务
  static resumeTask (id) {
    var httpMethod = 'GET';
    var body = taskServer.getArgs(this.resumeTask,arguments,'GET');
    return taskServer.connection(httpMethod, '/test/resumeSchedulerJob',body);
  }
  // 删除任务
  static deleteJob (id) {
    var httpMethod = 'GET';
    var body = taskServer.getArgs(this.deleteJob,arguments,'GET');
    return taskServer.connection(httpMethod, '/test/deleteJob',body);
  }
  // 删除任务从表里面
  static deleteJobInfo (id) {
    var httpMethod = 'GET';
    var body = taskServer.getArgs(this.deleteJobInfo,arguments,'GET');
    return taskServer.connection(httpMethod, '/test/deleteJobInfo',body);
  }
}
