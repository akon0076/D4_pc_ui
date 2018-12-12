
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>码表管理</span>
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
                <el-form ref="empOpenIdForm" :model="empOpenId" label-width="150px" :rules="rules">
                                    <el-col :span="12">
                                        <el-form-item label="名称" prop="name">
                                            <el-input type="input" v-model="empOpenId.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="12">
                                    <el-form-item label="人员" prop="employeeName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="empOpenId.employeeName"
                                                :fetch-suggestions="searchEmployeeName "
                                                placeholder="人员"
                                                @select="handleSelectEmployeeName"
                                                clearable autosize
                                                resize ="both" tabindex="3"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>

                                    <el-col :span="12">
                                        <el-form-item label="openId" prop="openId">
                                            <el-input type="input" v-model="empOpenId.openId"
                                                      placeholder="openId" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="uId" prop="uId">
                                            <el-input type="input" v-model="empOpenId.uId"
                                                      placeholder="uId" clearable autosize
                                                      resize ="both" tabindex=5
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="12">
                                    <el-form-item label="操作员" prop="operatorName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="empOpenId.operatorName"
                                                :fetch-suggestions="searchOperatorName "
                                                placeholder="操作员"
                                                @select="handleSelectOperatorName"
                                                clearable autosize
                                                resize ="both" tabindex="6"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>

                                    <el-col :span="12">
                                        <el-form-item label="平台类型" prop="type">
                                            <el-input type="input" v-model="empOpenId.type"
                                                      placeholder="平台类型：轻推、微信" clearable autosize
                                                      resize ="both" tabindex=7
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="24">
                                    <el-form-item label="备注" prop="remark">

                                            <el-input type="textarea" v-model="empOpenId.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-button type="primary" @click="submitEmpOpenId()"    :loading="isSubmiting" v-permission:simple_qingTui_EmpOpenId_Edit >提交</el-button>
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






import {EmployeeService} from '../../simple/organization/EmployeeService'
import {OperatorService} from '../../simple/permission/OperatorService'
import {EmpOpenIdService} from './EmpOpenIdService'
import {d4utils} from '../../../tools/d4utils'

export default {
    components: {
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
                employeeName: [
                    {required:  false , message: '请输入人员', trigger: 'blur'},
                    ],
                employeeId: [
                    {required:  false , message: '请输入人员', trigger: 'blur'},
                    ],
                openId: [
                    {required:  false , message: '请输入openId', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                uId: [
                    {required:  false , message: '请输入uId', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                operatorName: [
                    {required:  false , message: '请输入操作员', trigger: 'blur'},
                    ],
                operatorId: [
                    {required:  false , message: '请输入操作员', trigger: 'blur'},
                    ],
                type: [
                    {required:  false , message: '请输入平台类型', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            empOpenId:{},
            empOpenIdId:null,
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
        submitEmpOpenId() {
            var refs = this.$refs;
            refs['empOpenIdForm'].validate(valid => {
            if (valid) {
            if(this.empOpenId.eid)//编辑码表
            {
            this.updateEmpOpenId();
            }
            else//保存码表
            {
            this.saveEmpOpenId();
            }
            } else {
            return false
            }
            })
        },
        saveEmpOpenId()//保存码表
        {
            this.isSubmiting = true;
            EmpOpenIdService.saveEmpOpenId(this.empOpenId).then((resp) => {
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/qingTui/empOpenId'})
        }).catch((error) => {
            //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
            this.isSubmiting = false;

            this.addAlert({title:error.data.message})
            this.$message({
                type: 'error',
                message: '保存出错,原因是：'+error.data.message
            })
        })
        },
        updateEmpOpenId()//编辑码表
        {
            this.isSubmiting = true;
            EmpOpenIdService.updateEmpOpenId(this.empOpenId).then((resp) => {
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/qingTui/empOpenId'})
        }).catch((error) => {
            //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
            this.isSubmiting = false;
            this.addAlert({title:error.data.message})
            this.$message({
                type: 'error',
                message: '保存出错,原因是：'+error.data.message
            })

        })
        },
        findEmpOpenIdForEdit(empOpenIdId)//查找码表
        {
            EmpOpenIdService.findEmpOpenIdForEdit(empOpenIdId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询码表出错'
        })
        })
        },
        createEmpOpenId()//创建新的码表
        {
            EmpOpenIdService.createEmpOpenId().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的码表出错'
        })
        })
        },
        prepareForEdit(empOpenIdEditDto)
        {
            this.empOpenId = empOpenIdEditDto.empOpenId;

            this.employeeEmployees = empOpenIdEditDto.employeeEmployees
            this.operatorOperators = empOpenIdEditDto.operatorOperators
        },


        searchEmployeeName(queryString, cb) {
            var employeeEmployees = this.employeeEmployees;

            //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
            if(employeeEmployees)
            {
                var results = queryString ? employeeEmployees.filter(this.createFilterEmployeeName(queryString)) : employeeEmployees;
                cb(results);
            }
            else
            {
                var results = d4utils.getObjectCached("findEmployeesWithIdNameByName_"+queryString);
                if(results)
                {
                    cb(results);
                }
                else
                {
                    var cb1 = cb;
                    EmployeeService.findEmployeesWithIdNameByName(queryString).then((resp) => {
                    if (resp.data)
                    {
                        var results = resp.data;
                        d4utils.cacheObject("findEmployeesWithIdNameByName_"+queryString);
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
            createFilterEmployeeName(queryString) {
                return (employee) => {
                    return (employee.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
                };
            },
            handleSelectEmployeeName(item){
                this.empOpenId.employeeId = item.eid;
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
                this.empOpenId.operatorId = item.eid;
            },
    },
    created() {
        this.empOpenIdId = this.$route.params.empOpenIdId;
        if(this.empOpenIdId)//编辑
        {
            this.findEmpOpenIdForEdit(this.empOpenIdId);
        }
        else//新增
        {
            this.createEmpOpenId();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
