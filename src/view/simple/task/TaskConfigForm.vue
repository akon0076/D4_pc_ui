
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>定时任务配置管理</span>
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
                <el-form ref="taskConfigForm" :model="taskConfig" label-width="150px" :rules="rules">
                                    <el-col :span="11">
                                        <el-form-item label="名称" prop="name">
                                            <file-tip content="名称"></file-tip>
                                            <el-input type="input" v-model="taskConfig.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="任务名称" prop="taskName">
                                            <file-tip content="任务名称"></file-tip>
                                            <el-input type="input" v-model="taskConfig.taskName"
                                                      placeholder="任务编码" clearable autosize
                                                      resize ="both" tabindex=3
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="任务类型" prop="taskType">
                                            <file-tip content="任务类型"></file-tip>
                                            <el-input type="input" v-model="taskConfig.taskType"
                                                      placeholder="任务类型" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="11">
                                    <el-form-item label="创建时间" prop="createTime">
                                        <el-date-picker clearable
                                                v-model="taskConfig.createTime"
                                                align="right"
                                                type="date"
                                                placeholder="创建时间"
                                                :picker-options="pickerOptionsCreateTime" style="width: 100%">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="11">
                                    <el-form-item label="是否需要参数" prop="isNeedVariable">
                                        <el-input type="number" step="1" v-model="taskConfig.isNeedVariable"
                                                  placeholder="是否需要参数" clearable autosize
                                                  resize ="both" tabindex=6
                                                          maxlength=255
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="22">
                                    <el-form-item label="备注" prop="remark">
                                        <file-tip content="备注"></file-tip>
                                            <el-input type="textarea" v-model="taskConfig.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                    <el-col :span="11">
                        <el-form-item>
                            <el-button type="primary" @click="submitTaskConfig()"    :loading="isSubmiting" v-permission:simple_task_TaskConfig_Edit >提交</el-button>
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




import {TaskConfigService} from './TaskConfigService'
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
                    {required:  true , message: '请输入名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                taskName: [
                    {required:  true , message: '请输入任务名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                taskType: [
                    {required:  true , message: '请输入任务类型', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                createTime: [
                    { type: 'date',required:  true , message: '请输入创建时间', trigger: 'change'},
                    ],
                isNeedVariable: [
                    {required:  true , message: '请输入是否需要参数', trigger: 'blur'},
                    { validator: validateIntRange(-2147483648,2147483647), trigger: 'blur' },
                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            taskConfig:{},
            taskConfigId:null,
            pickerOptionsCreateTime: {
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
        submitTaskConfig() {
            var refs = this.$refs;
            refs['taskConfigForm'].validate(valid => {
            if (valid) {
            if(this.taskConfig.eid)//编辑定时任务
            {
            this.updateTaskConfig();
            }
            else//保存定时任务
            {
            this.saveTaskConfig();
            }
            } else {
            return false
            }
            })
        },
        saveTaskConfig()//保存定时任务
        {
            this.isSubmiting = true;
            this.buttonRequestProgressStart("正在保存,请稍后...");
            TaskConfigService.saveTaskConfig(this.taskConfig).then((resp) => {
                this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/task/taskConfig'})
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
        updateTaskConfig()//编辑定时任务
        {
            this.isSubmiting = true;
            this.buttonRequestProgressStart("正在更新,请稍后...");
            TaskConfigService.updateTaskConfig(this.taskConfig).then((resp) => {
                this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/task/taskConfig'})
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
        findTaskConfigForEdit(taskConfigId)//查找定时任务
        {
            TaskConfigService.findTaskConfigForEdit(taskConfigId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询定时任务出错'
        })
        })
        },
        createTaskConfig()//创建新的定时任务
        {
            TaskConfigService.createTaskConfig().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的定时任务出错'
        })
        })
        },
        prepareForEdit(taskConfigEditDto)
        {
            this.taskConfig = taskConfigEditDto.taskConfig;

        },

    },
    created() {
        this.taskConfigId = this.$route.params.taskConfigId;
        if(this.taskConfigId)//编辑
        {
            this.findTaskConfigForEdit(this.taskConfigId);
        }
        else//新增
        {
            this.createTaskConfig();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
