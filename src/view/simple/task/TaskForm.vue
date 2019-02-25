
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>定时任务管理</span>
            </div>
            <div class="alert-container clearfix">
                <el-alert  v-for="alert in alerts.successes"  :key="alert.title"
                           v-bind:title="alert.title"
                           type="success"
                           show-icon>
                </el-alert>
                <el-alert  v-for="alert in alerts.infos"  :key="alert.title"
                           v-bind:title="alert.title"
                           type="info"
                           show-icon >
                </el-alert>
                <el-alert  v-for="alert in alerts.warnings"  :key="alert.title"
                           v-bind:title="alert.title"
                           type="warning"
                           show-icon >
                </el-alert>
                <el-alert  v-for="alert in alerts.errors"  :key="alert.title"
                           v-bind:title="alert.title"
                           type="error"
                           show-icon >
                </el-alert>
            </div>
            <div class="text item">
                <el-form ref="taskForm" :model="task" label-width="150px" :rules="rules">
                                    <el-col :span="11">
                                        <el-form-item label="名称" prop="name">
                                            <file-tip content="名称"></file-tip>
                                            <el-input type="input" v-model="task.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="任务编码" prop="taskId">
                                            <file-tip content="任务编码"></file-tip>
                                            <el-input type="input" v-model="task.taskId"
                                                      placeholder="任务编码" clearable autosize
                                                      resize ="both" tabindex=3
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="表达式" prop="taskExpression">
                                            <file-tip content="表达式"></file-tip>
                                            <el-input type="input" v-model="task.taskExpression"
                                                      placeholder="表达式" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="11">
                                    <el-form-item label="发布人" prop="taskPublisher">
                                        <el-input type="number" step="1" v-model="task.taskPublisher"
                                                  placeholder="发布人" clearable autosize
                                                  resize ="both" tabindex=5
                                                          maxlength=255
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="创建时间" prop="taskCreateTime">
                                        <el-date-picker clearable
                                                v-model="task.taskCreateTime"
                                                align="right"
                                                type="date"
                                                placeholder="创建时间"
                                                :picker-options="pickerOptionsTaskCreateTime">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="完成时间" prop="taskCompleteTime">
                                        <el-date-picker clearable
                                                v-model="task.taskCompleteTime"
                                                align="right"
                                                type="date"
                                                placeholder="完成时间"
                                                :picker-options="pickerOptionsTaskCompleteTime">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="任务状态" prop="taskStatus">
                                            <file-tip content="任务状态"></file-tip>
                                            <el-input type="input" v-model="task.taskStatus"
                                                      placeholder="任务状态" clearable autosize
                                                      resize ="both" tabindex=8
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>

                                <el-col :span="11">
                                    <el-form-item label="单位" prop="taskClassName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="task.taskClassName"
                                                :fetch-suggestions="searchTaskClassName "
                                                placeholder="所属单位"
                                                @select="handleSelectTaskClassName"
                                                clearable autosize
                                                resize ="both" tabindex="9"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="任务配置ID" prop="taskConfigId">
                                        <el-input type="number" step="1" v-model="task.taskConfigId"
                                                  placeholder="任务配置ID" clearable autosize
                                                  resize ="both" tabindex=11
                                                          maxlength=255
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="任务组" prop="taskGroup">
                                            <file-tip content="任务组"></file-tip>
                                            <el-input type="input" v-model="task.taskGroup"
                                                      placeholder="任务组" clearable autosize
                                                      resize ="both" tabindex=12
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="任务名称" prop="taskName">
                                            <file-tip content="任务名称"></file-tip>
                                            <el-input type="input" v-model="task.taskName"
                                                      placeholder="任务名称" clearable autosize
                                                      resize ="both" tabindex=13
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="22">
                                    <el-form-item label="备注" prop="remark">
                                        <file-tip content="备注"></file-tip>
                                            <el-input type="textarea" v-model="task.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                    <el-col :span="11">
                        <el-form-item>
                            <el-button type="primary" @click="submitTask()"    :loading="isSubmiting" v-permission:simple_task_Task_Edit >提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
            <div class="text item clearfix">
                <el-alert v-for="remark in alerts.remarks"  :key="remark.title"
                          v-bind:title="remark.title"
                          type="info"
                          v-bind:description="remark.content">
                </el-alert>
            </div>
        </el-card>
    </div>
</template>

<script>





import {OrganizationService} from '../../simple/organization/OrganizationService'
import {TaskService} from './TaskService'
import {d4utils} from '../../../tools/d4utils'
    import fileTip from '@/components/tip/fileTip'
export default {
    components: {
        fileTip
    },
    data() {
        var validateIntRange = d4utils.validateFloatRange;
        var validateFloatRange = d4utils.validateFloatRange;
        var validateString = d4utils.validateString;

        return {
            rules: {
                name: [
                    {required:  false , message: '请输入名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                taskId: [
                    {required:  false , message: '请输入任务编码', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                taskExpression: [
                    {required:  false , message: '请输入表达式', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                taskPublisher: [
                    {required:  false , message: '请输入发布人', trigger: 'blur'},
                    { validator: validateIntRange(-2147483648,2147483647), trigger: 'blur' },
                    ],
                taskCreateTime: [
                    { type: 'date',required:  false , message: '请输入创建时间', trigger: 'change'},
                    ],
                taskCompleteTime: [
                    { type: 'date',required:  false , message: '请输入完成时间', trigger: 'change'},
                    ],
                taskStatus: [
                    {required:  false , message: '请输入任务状态', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                taskClassId: [
                    {required:  false , message: '请输入单位', trigger: 'blur'},
                    ],
                taskClassName: [
                    {required:  false , message: '请输入单位', trigger: 'blur'},
                    ],
                taskConfigId: [
                    {required:  false , message: '请输入任务配置ID', trigger: 'blur'},
                    { validator: validateIntRange(-2147483648,2147483647), trigger: 'blur' },
                    ],
                taskGroup: [
                    {required:  false , message: '请输入任务组', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                taskName: [
                    {required:  false , message: '请输入任务名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            task:{},
            taskId:null,
            pickerOptionsTaskCreateTime: {
                disabledDate(time) {
                    //TODO: 请在此判断可以输入的日期范围,
                    //return time.getTime() > Date.now();
                    return false;
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            pickerOptionsTaskCompleteTime: {
                disabledDate(time) {
                    //TODO: 请在此判断可以输入的日期范围,
                    //return time.getTime() > Date.now();
                    return false;
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            pickerOptionsCreateDatetime: {
                disabledDate(time) {
                    //TODO: 请在此判断可以输入的日期范围,
                    //return time.getTime() > Date.now();
                    return false;
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            pickerOptionsUpdateDatetime: {
                disabledDate(time) {
                    //TODO: 请在此判断可以输入的日期范围,
                    //return time.getTime() > Date.now();
                    return false;
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
        alerts:{ remarks:[{title:"功能说明",content:"TODO: 请在这里加上功能说明"},],
                successes:[], //TODO:[{title:'消息内容'},]
                infos:[],
                warnings:[],
                errors:[]},
        }
    },

    methods: {
        addAlert(message,title,type){
            //type 可选的值为:remarks,successes,infos,warnings,errors
            type = type? type:"errors";
            type = this.alerts[type]?type:"errors";
            title = title?title:message;
            this.alerts[type].unshift({title:title,content:message});
        },
        removeAlert(title,type){
            //type 可选的值为:remarks,successes,infos,warnings,errors
            type = type? type:"errors";
            type = this.alerts[type]?type:"errors";
            for (var i = this.alerts[type].length-1; i>=0 ; i--) {
                delete this.alerts[type][i]
            }
        },
        submitTask() {
            var refs = this.$refs;
            refs['taskForm'].validate(valid => {
            if (valid) {
            if(this.task.eid)//编辑定时任务
            {
            this.updateTask();
            }
            else//保存定时任务
            {
            this.saveTask();
            }
            } else {
            return false
            }
            })
        },
        saveTask()//保存定时任务
        {
            this.isSubmiting = true;
            this.buttonRequestProgressStart("正在保存,请稍后...");
            TaskService.saveTask(this.task).then((resp) => {
                this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/task/task'})
        }).catch((error) => {
            this.buttonRequestProgressClose();
            //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
            this.isSubmiting = false;

            this.addAlert({title:error.data.message})
            this.$message({
                type: 'error',
                message: '保存出错,原因是：'+error.data.message
            })
        })
        },
        updateTask()//编辑定时任务
        {
            this.isSubmiting = true;
            this.buttonRequestProgressStart("正在更新,请稍后...");
            TaskService.updateTask(this.task).then((resp) => {
                this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/task/task'})
        }).catch((error) => {
            this.buttonRequestProgressClose();
            //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
            this.isSubmiting = false;
            this.addAlert({title:error.data.message})
            this.$message({
                type: 'error',
                message: '保存出错,原因是：'+error.data.message
            })

        })
        },
        findTaskForEdit(taskId)//查找定时任务
        {
            TaskService.findTaskForEdit(taskId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询定时任务出错'
        })
        })
        },
        createTask()//创建新的定时任务
        {
            TaskService.createTask().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的定时任务出错'
        })
        })
        },
        prepareForEdit(taskEditDto)
        {
            this.task = taskEditDto.task;

            this.taskClassOrganizations = taskEditDto.taskClassOrganizations
        },


        searchTaskClassName(queryString, cb) {
            var taskClassOrganizations = this.taskClassOrganizations;

            //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
            if(taskClassOrganizations)
            {
                var results = queryString ? taskClassOrganizations.filter(this.createFilterTaskClassName(queryString)) : taskClassOrganizations;
                cb(results);
            }
            else
            {
                var results = d4utils.getObjectCached("findOrganizationsWithIdNameByName_"+queryString);
                if(results)
                {
                    cb(results);
                }
                else
                {
                    var cb1 = cb;
                    OrganizationService.findOrganizationsWithIdNameByName(queryString).then((resp) => {
                    if (resp.data)
                    {
                        var results = resp.data;
                        d4utils.cacheObject("findOrganizationsWithIdNameByName_"+queryString);
                        cb1(results)
                    }
                else
                    {
                        this.$message({
                            type: 'error',
                            message: '没有查询到引用数据'
                        });
                    }
                }).catch((error) => {
                    this.$message({
                    type: 'error',
                    message: '查询引用数据出错'
                })
                });
                }
            }
        },
            createFilterTaskClassName(queryString) {
                return (organization) => {
                    return (organization.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
                };
            },
            handleSelectTaskClassName(item){
                this.task.taskClassId = item.eid;
            },
    },
    created() {
        this.taskId = this.$route.params.taskId;
        if(this.taskId)//编辑
        {
            this.findTaskForEdit(this.taskId);
        }
        else//新增
        {
            this.createTask();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
