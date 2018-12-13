
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>附件管理</span>
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
                <el-form ref="attachmentForm" :model="attachment" label-width="150px" :rules="rules">
                                    <el-col :span="12">
                                        <el-form-item label="名称" prop="name">
                                            <el-input type="input" v-model="attachment.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="附件的真实名称" prop="attachmentRealName">
                                            <el-input type="input" v-model="attachment.attachmentRealName"
                                                      placeholder="附件的真实名称" clearable autosize
                                                      resize ="both" tabindex=3
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="保存文件名" prop="attachmentLogicalName">
                                            <el-input type="input" v-model="attachment.attachmentLogicalName"
                                                      placeholder="保存文件名" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="12">
                                    <el-form-item label="上传时间" prop="uploadTime">
                                        <el-date-picker clearable
                                                v-model="attachment.uploadTime"
                                                align="right"
                                                type="date"
                                                placeholder="上传时间"
                                                :picker-options="pickerOptionsUploadTime">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="上传人" prop="uploadEmployeeName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="attachment.uploadEmployeeName"
                                                :fetch-suggestions="searchUploadEmployeeName "
                                                placeholder="上传人"
                                                @select="handleSelectUploadEmployeeName"
                                                clearable autosize
                                                resize ="both" tabindex="6"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="附件地址" prop="attachmentAddr">
                                            <el-input type="input" v-model="attachment.attachmentAddr"
                                                      placeholder="附件地址" clearable autosize
                                                      resize ="both" tabindex=7
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="关联表单Id" prop="associateFormId">
                                            <el-input type="input" v-model="attachment.associateFormId"
                                                      placeholder="关联表单Id" clearable autosize
                                                      resize ="both" tabindex=8
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="关联表单名称" prop="associateFormName">
                                            <el-input type="input" v-model="attachment.associateFormName"
                                                      placeholder="关联表单名称" clearable autosize
                                                      resize ="both" tabindex=9
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="12">
                                    <el-form-item label="附件大小" prop="associateSize">
                                        <el-input type="number" step="1" v-model="attachment.associateSize"
                                                  placeholder="附件大小" clearable autosize
                                                  resize ="both" tabindex=10
                                                          maxlength=255
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="是否有效" prop="isEffective">
                                        <el-radio-group v-model="attachment.isEffective">
                                            <el-radio-button :label="true">是</el-radio-button>
                                            <el-radio-button :label="false">否</el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="备注" prop="remark">

                                            <el-input type="textarea" v-model="attachment.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-button type="primary" @click="submitAttachment()"    :loading="isSubmiting" v-permission:simple_attachment_Attachment_Edit >提交</el-button>
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
import {AttachmentService} from './AttachmentService'
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
                attachmentRealName: [
                    {required:  true , message: '请输入附件的真实名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                attachmentLogicalName: [
                    {required:  true , message: '请输入保存文件名', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                uploadTime: [
                    { type: 'date',required:  false , message: '请输入上传时间', trigger: 'change'},
                    ],
                uploadEmployeeId: [
                    {required:  false , message: '请输入上传人', trigger: 'blur'},
                    ],
                uploadEmployeeName: [
                    {required:  false , message: '请输入上传人', trigger: 'blur'},
                    ],
                attachmentAddr: [
                    {required:  false , message: '请输入附件地址', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                associateFormId: [
                    {required:  true , message: '请输入关联表单Id', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                associateFormName: [
                    {required:  true , message: '请输入关联表单名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                associateSize: [

                    {required:  true , message: '请输入附件大小', trigger: 'blur'},
                    { validator: validateIntRange(-9223372036854775808,9223372036854775807), trigger: 'blur' },
                    ],
                isEffective: [

                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            attachment:{},
            attachmentId:null,
            pickerOptionsUploadTime: {
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
        submitAttachment() {
            var refs = this.$refs;
            refs['attachmentForm'].validate(valid => {
            if (valid) {
            if(this.attachment.eid)//编辑附件
            {
            this.updateAttachment();
            }
            else//保存附件
            {
            this.saveAttachment();
            }
            } else {
            return false
            }
            })
        },
        saveAttachment()//保存附件
        {
            this.isSubmiting = true;
          this.buttonRequestProgressStart("正在保存,请稍后...");
            AttachmentService.saveAttachment(this.attachment).then((resp) => {
              this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/attachment/attachment'})
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
        updateAttachment()//编辑附件
        {
            this.isSubmiting = true;
          this.buttonRequestProgressStart("正在更新,请稍后...");
            AttachmentService.updateAttachment(this.attachment).then((resp) => {
              this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/attachment/attachment'})
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
        findAttachmentForEdit(attachmentId)//查找附件
        {
            AttachmentService.findAttachmentForEdit(attachmentId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询附件出错'
        })
        })
        },
        createAttachment()//创建新的附件
        {
            AttachmentService.createAttachment().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的附件出错'
        })
        })
        },
        prepareForEdit(attachmentEditDto)
        {
            this.attachment = attachmentEditDto.attachment;

            this.uploadEmployeeEmployees = attachmentEditDto.uploadEmployeeEmployees
        },


        searchUploadEmployeeName(queryString, cb) {
            var uploadEmployeeEmployees = this.uploadEmployeeEmployees;

            //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
            if(uploadEmployeeEmployees)
            {
                var results = queryString ? uploadEmployeeEmployees.filter(this.createFilterUploadEmployeeName(queryString)) : uploadEmployeeEmployees;
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
            createFilterUploadEmployeeName(queryString) {
                return (employee) => {
                    return (employee.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
                };
            },
            handleSelectUploadEmployeeName(item){
                this.attachment.uploadEmployeeId = item.eId;
            },
    },
    created() {
        this.attachmentId = this.$route.params.attachmentId;
        if(this.attachmentId)//编辑
        {
            this.findAttachmentForEdit(this.attachmentId);
        }
        else//新增
        {
            this.createAttachment();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
