
import {simpleServer} from '@/tools/servers'

/**
 * 定时任务
 */
export class TaskConfigService {
    // 分页查询列表
    static findTaskConfigs (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findTaskConfigs,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/task/TaskConfig/findTaskConfigs', body);
    }


    //根据定时任务Id查询定时任务
    static findTaskConfig (taskConfigId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTaskConfig ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/TaskConfig/findTaskConfig',body);
    }

    //为了编辑,根据定时任务Id查询定时任务
    static findTaskConfigForEdit(taskConfigId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTaskConfigForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/TaskConfig/findTaskConfigForEdit',body);
    }

    //为了查看,根据定时任务Id查询定时任务，所有外键字段的名称都已加载
    static findTaskConfigForView(taskConfigId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTaskConfigForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/TaskConfig/findTaskConfigForView',body);
    }

    //创建新的定时任务
    static createTaskConfig() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createTaskConfig,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/TaskConfig/createTaskConfig',body);
    }

    //保存定时任务
    static saveTaskConfig(taskConfig) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveTaskConfig,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/task/TaskConfig/saveTaskConfig', body);
    }

    //编辑定时任务
    static updateTaskConfig (taskConfig) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateTaskConfig,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/task/TaskConfig/updateTaskConfig', body);
    }

    //根据定时任务Id删除定时任务
    static deleteTaskConfig (taskConfigId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteTaskConfig,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/TaskConfig/deleteTaskConfig',body);
    }

    //为了查看,根据定时任务Id查询定时任务，只加载ID 和 名称
    static findTaskConfigsWithIdNameById(taskConfigId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTaskConfigsWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/TaskConfig/findTaskConfigsWithIdNameById',body);
    }

    //为了查看,根据定时任务 名称 查询定时任务，只加载ID 和 名称
    static findTaskConfigsWithIdNameByName(taskConfigName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTaskConfigsWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/TaskConfig/findTaskConfigsWithIdNameByName',body);
    }


}
