
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>日志管理</span>
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
                <el-form ref="logForm" :model="log" label-width="150px" :rules="rules">
                                    <el-col :span="11">
                                        <el-form-item label="名称" prop="name">
                                            <file-tip content="名称"></file-tip>
                                            <el-input type="input" v-model="log.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="11">
                                    <el-form-item label="操作员" prop="operatorName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="log.operatorName"
                                                :fetch-suggestions="searchOperatorName "
                                                placeholder="操作员"
                                                @select="handleSelectOperatorName"
                                                clearable autosize
                                                resize ="both" tabindex="3"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>

                                    <el-col :span="11">
                                        <el-form-item label="IP地址" prop="ipAddress">
                                            <file-tip content="IP地址"></file-tip>
                                            <el-input type="input" v-model="log.ipAddress"
                                                      placeholder="IP地址" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="11">
                                    <el-form-item label="日志类型" prop="logType">
                                        <el-input type="number" step="1" v-model="log.logType"
                                                  placeholder="日志类型" clearable autosize
                                                  resize ="both" tabindex=5
                                                          maxlength=255
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="操作实体" prop="entity">
                                            <file-tip content="操作实体"></file-tip>
                                            <el-input type="input" v-model="log.entity"
                                                      placeholder="操作实体" clearable autosize
                                                      resize ="both" tabindex=6
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="操作类型" prop="operationType">
                                            <file-tip content="操作类型"></file-tip>
                                            <el-input type="input" v-model="log.operationType"
                                                      placeholder="操作类型" clearable autosize
                                                      resize ="both" tabindex=7
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="11">
                                    <el-form-item label="操作时间" prop="logDate">
                                        <el-date-picker clearable
                                                v-model="log.logDate"
                                                align="right"
                                                type="date"
                                                placeholder="操作时间"
                                                :picker-options="pickerOptionsLogDate">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="操作内容" prop="operationContent">
                                            <file-tip content="操作内容"></file-tip>
                                            <el-input type="input" v-model="log.operationContent"
                                                      placeholder="操作内容" clearable autosize
                                                      resize ="both" tabindex=9
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="url" prop="url">
                                            <file-tip content="url"></file-tip>
                                            <el-input type="input" v-model="log.url"
                                                      placeholder="url" clearable autosize
                                                      resize ="both" tabindex=10
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="模块" prop="module">
                                            <file-tip content="模块"></file-tip>
                                            <el-input type="input" v-model="log.module"
                                                      placeholder="模块" clearable autosize
                                                      resize ="both" tabindex=11
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="22">
                                    <el-form-item label="备注" prop="remark">
                                        <file-tip content="备注"></file-tip>
                                            <el-input type="textarea" v-model="log.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                    <el-col :span="11">
                        <el-form-item>
                            <el-button type="primary" @click="submitLog()"    :loading="isSubmiting" v-permission:simple_log_Log_Edit >提交</el-button>
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





import {OperatorService} from '../../simple/permission/OperatorService'
import {LogService} from './LogService'
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
                operatorName: [
                    {required:  false , message: '请输入操作员', trigger: 'blur'},
                    ],
                operatorId: [
                    {required:  true , message: '请输入操作员', trigger: 'blur'},
                    ],
                ipAddress: [
                    {required:  false , message: '请输入IP地址', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                logType: [
                    {required:  false , message: '请输入日志类型', trigger: 'blur'},
                    { validator: validateIntRange(-2147483648,2147483647), trigger: 'blur' },
                    ],
                entity: [
                    {required:  false , message: '请输入操作实体', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                operationType: [
                    {required:  false , message: '请输入操作类型', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                logDate: [
                    { type: 'date',required:  false , message: '请输入操作时间', trigger: 'change'},
                    ],
                operationContent: [
                    {required:  false , message: '请输入操作内容', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                url: [
                    {required:  false , message: '请输入url', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                module: [
                    {required:  false , message: '请输入模块', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            log:{},
            logId:null,
            pickerOptionsLogDate: {
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
        submitLog() {
            var refs = this.$refs;
            refs['logForm'].validate(valid => {
            if (valid) {
            if(this.log.eid)//编辑日志
            {
            this.updateLog();
            }
            else//保存日志
            {
            this.saveLog();
            }
            } else {
            return false
            }
            })
        },
        saveLog()//保存日志
        {
            this.isSubmiting = true;
            this.buttonRequestProgressStart("正在保存,请稍后...");
            LogService.saveLog(this.log).then((resp) => {
                this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/log/log'})
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
        updateLog()//编辑日志
        {
            this.isSubmiting = true;
            this.buttonRequestProgressStart("正在更新,请稍后...");
            LogService.updateLog(this.log).then((resp) => {
                this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/log/log'})
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
        findLogForEdit(logId)//查找日志
        {
            LogService.findLogForEdit(logId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询日志出错'
        })
        })
        },
        createLog()//创建新的日志
        {
            LogService.createLog().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的日志出错'
        })
        })
        },
        prepareForEdit(logEditDto)
        {
            this.log = logEditDto.log;

            this.operatorOperators = logEditDto.operatorOperators
        },


        searchOperatorName(queryString, cb) {
            var operatorOperators = this.operatorOperators;

            //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
            if(operatorOperators)
            {
                var results = queryString ? operatorOperators.filter(this.createFilterOperatorName(queryString)) : operatorOperators;
                cb(results);
            }
            else
            {
                var results = d4utils.getObjectCached("findOperatorsWithIdNameByName_"+queryString);
                if(results)
                {
                    cb(results);
                }
                else
                {
                    var cb1 = cb;
                    OperatorService.findOperatorsWithIdNameByName(queryString).then((resp) => {
                    if (resp.data)
                    {
                        var results = resp.data;
                        d4utils.cacheObject("findOperatorsWithIdNameByName_"+queryString);
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
            createFilterOperatorName(queryString) {
                return (operator) => {
                    return (operator.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
                };
            },
            handleSelectOperatorName(item){
                this.log.operatorId = item.eid;
            },
    },
    created() {
        this.logId = this.$route.params.logId;
        if(this.logId)//编辑
        {
            this.findLogForEdit(this.logId);
        }
        else//新增
        {
            this.createLog();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
