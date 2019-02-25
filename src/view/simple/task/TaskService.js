
import {simpleServer} from '@/tools/servers'

/**
 * 定时任务
 */
export class TaskService {
    // 分页查询列表
    static findTasks (pageDTO) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.findTasks,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/task/Task/findTasks', body);
    }


    //根据定时任务Id查询定时任务
    static findTask (taskId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTask ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/Task/findTask',body);
    }

    //为了编辑,根据定时任务Id查询定时任务
    static findTaskForEdit(taskId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTaskForEdit ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/Task/findTaskForEdit',body);
    }

    //为了查看,根据定时任务Id查询定时任务，所有外键字段的名称都已加载
    static findTaskForView(taskId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTaskForView ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/Task/findTaskForView',body);
    }

    //创建新的定时任务
    static createTask() {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.createTask,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/Task/createTask',body);
    }

    //保存定时任务
    static saveTask(task) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.saveTask,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/task/Task/saveTask', body);
    }

    //编辑定时任务
    static updateTask (task) {
        var httpMethod = 'POST';
        var body = simpleServer.getArgs(this.updateTask,arguments,'POST');
        return simpleServer.connection(httpMethod, '/simple/task/Task/updateTask', body);
    }

    //根据定时任务Id删除定时任务
    static deleteTask (taskId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.deleteTask,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/Task/deleteTask',body);
    }

    //为了查看,根据定时任务Id查询定时任务，只加载ID 和 名称
    static findTasksWithIdNameById(taskId) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTasksWithIdNameById ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/Task/findTasksWithIdNameById',body);
    }

    //为了查看,根据定时任务 名称 查询定时任务，只加载ID 和 名称
    static findTasksWithIdNameByName(taskName) {
        var httpMethod = 'GET';
        var body = simpleServer.getArgs(this.findTasksWithIdNameByName ,arguments,'GET');
        return simpleServer.connection(httpMethod, '/simple/task/Task/findTasksWithIdNameByName',body);
    }


}
