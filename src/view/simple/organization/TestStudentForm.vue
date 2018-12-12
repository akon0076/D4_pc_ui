
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>学生管理</span>
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
                <el-form ref="testStudentForm" :model="testStudent" label-width="150px" :rules="rules">
                                    <el-col :span="12">
                                        <el-form-item label="名称" prop="name">
                                            <el-input type="input" v-model="testStudent.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="员工姓名" prop="staffName">
                                            <el-input type="input" v-model="testStudent.staffName"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=3
                                                              maxlength=20
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="身份证号" prop="staffIdNumber">
                                            <el-input type="input" v-model="testStudent.staffIdNumber"
                                                      placeholder="身份证号" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="12">
                                    <el-form-item label="年龄" prop="staffAge">
                                        <el-input type="number" step="1" v-model="testStudent.staffAge"
                                                  placeholder="年龄" clearable autosize
                                                  resize ="both" tabindex=5
                                                          maxlength=255
                                        ></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="薪水" prop="salary">
                                        <el-input type="number" step="0.01" v-model="testStudent.salary"
                                                  placeholder="薪水" clearable autosize
                                                  resize ="both" tabindex=6
                                                          maxlength=255
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="分数" prop="score">
                                        <el-input type="number" step="1" v-model="testStudent.score"
                                                  placeholder="分数" clearable autosize
                                                  resize ="both" tabindex=7
                                                          maxlength=255
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="入职日期" prop="dateOfJoin">
                                        <el-date-picker clearable
                                                v-model="testStudent.dateOfJoin"
                                                align="right"
                                                type="date"
                                                placeholder="入职的时间"
                                                :picker-options="pickerOptionsDateOfJoin">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="单位" prop="organizationName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="testStudent.organizationName"
                                                :fetch-suggestions="searchOrganizationName "
                                                placeholder="所属单位"
                                                @select="handleSelectOrganizationName"
                                                clearable autosize
                                                resize ="both" tabindex="9"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="性别" prop="gender">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="testStudent.gender"
                                                :fetch-suggestions="searchGender "
                                                placeholder="性别"
                                                clearable autosize
                                                resize ="both" tabindex="11"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="是否有效" prop="enabled">
                                        <el-radio-group v-model="testStudent.enabled">
                                            <el-radio-button :label="true">是</el-radio-button>
                                            <el-radio-button :label="false">否</el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="备注" prop="remark">

                                            <el-input type="textarea" v-model="testStudent.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-button type="primary" @click="submitTestStudent()"    :loading="isSubmiting" v-permission:simple_organization_TestStudent_Edit >提交</el-button>
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
import {TestStudentService} from './TestStudentService'
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
                staffName: [
                    {required:  true , message: '请输入员工姓名', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                staffIdNumber: [
                    {required:  true , message: '请输入身份证号', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                staffAge: [
                    {required:  false , message: '请输入年龄', trigger: 'blur'},
                    { validator: validateIntRange(-2147483648,2147483647), trigger: 'blur' },
                    ],
                salary: [
                    {required:  false , message: '请输入薪水', trigger: 'blur'},
                    { validator: validateFloatRange(-9223372036854775808,9223372036854775807), trigger: 'blur' },
                    ],
                score: [

                    {required:  false , message: '请输入分数', trigger: 'blur'},
                    { validator: validateIntRange(-9223372036854775808,9223372036854775807), trigger: 'blur' },
                    ],
                dateOfJoin: [
                    { type: 'date',required:  false , message: '请输入入职日期', trigger: 'change'},
                    ],
                organizationName: [
                    {required:  false , message: '请输入单位', trigger: 'blur'},
                    ],
                organizationId: [
                    {required:  false , message: '请输入单位', trigger: 'blur'},
                    ],
                gender: [
                    {required:  false , message: '请输入性别', trigger: 'blur'},
                    ],
                enabled: [

                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            testStudent:{},
            testStudentId:null,
            pickerOptionsDateOfJoin: {
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
        submitTestStudent() {
            var refs = this.$refs;
            refs['testStudentForm'].validate(valid => {
            if (valid) {
            if(this.testStudent.eid)//编辑学生
            {
            this.updateTestStudent();
            }
            else//保存学生
            {
            this.saveTestStudent();
            }
            } else {
            return false
            }
            })
        },
        saveTestStudent()//保存学生
        {
            this.isSubmiting = true;
            TestStudentService.saveTestStudent(this.testStudent).then((resp) => {
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/organization/testStudent'})
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
        updateTestStudent()//编辑学生
        {
            this.isSubmiting = true;
            TestStudentService.updateTestStudent(this.testStudent).then((resp) => {
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/organization/testStudent'})
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
        findTestStudentForEdit(testStudentId)//查找学生
        {
            TestStudentService.findTestStudentForEdit(testStudentId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询学生出错'
        })
        })
        },
        createTestStudent()//创建新的学生
        {
            TestStudentService.createTestStudent().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的学生出错'
        })
        })
        },
        prepareForEdit(testStudentEditDto)
        {
            this.testStudent = testStudentEditDto.testStudent;

            this.genderCodeTables = testStudentEditDto.genderCodeTables;
            this.organizationOrganizations = testStudentEditDto.organizationOrganizations
        },
        searchGender(queryString, cb) {
            var genderCodeTables = this.genderCodeTables;
            var results = queryString ? genderCodeTables.filter(this.createFilterGender(queryString)) : genderCodeTables;
            cb(results);
        },
        createFilterGender(queryString) {
            return (Gender) => {
                return (Gender.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
            };
        },


        searchOrganizationName(queryString, cb) {
            var organizationOrganizations = this.organizationOrganizations;

            //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
            if(organizationOrganizations)
            {
                var results = queryString ? organizationOrganizations.filter(this.createFilterOrganizationName(queryString)) : organizationOrganizations;
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
            createFilterOrganizationName(queryString) {
                return (organization) => {
                    return (organization.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
                };
            },
            handleSelectOrganizationName(item){
                this.testStudent.organizationId = item.eId;
            },
    },
    created() {
        this.testStudentId = this.$route.params.testStudentId;
        if(this.testStudentId)//编辑
        {
            this.findTestStudentForEdit(this.testStudentId);
        }
        else//新增
        {
            this.createTestStudent();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
