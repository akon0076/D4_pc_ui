
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/simple/report/modelFile' }">模板文件管理列表</el-breadcrumb-item>
                <el-breadcrumb-item>模板文件管理</el-breadcrumb-item>
              </el-breadcrumb>
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
                <el-form ref="modelFileForm" :model="modelFile" label-width="150px" :rules="rules">
                                    <el-col :span="11">
                                        <el-form-item label="名称" prop="name">
                                            <file-tip content="名称"></file-tip>
                                            <el-input type="input" v-model="modelFile.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="模板唯一标识" prop="modelKey">
                                            <file-tip content="模板唯一标识"></file-tip>
                                            <el-input type="input" v-model="modelFile.modelKey"
                                                      placeholder="模板唯一标识" clearable autosize
                                                      resize ="both" tabindex=3
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="模板名称" prop="modelName">
                                            <file-tip content="模板名称"></file-tip>
                                            <el-input type="input" v-model="modelFile.modelName"
                                                      placeholder="模板名称" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="分类目录" prop="category">
                                            <file-tip content="用于分类展示"></file-tip>
                                            <el-input type="input" v-model="modelFile.category"
                                                      placeholder="用于分类展示" clearable autosize
                                                      resize ="both" tabindex=5
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="模板类别" prop="modelType">
                                            <file-tip content="报表、图表、混合表"></file-tip>
                                            <el-input type="input" v-model="modelFile.modelType"
                                                      placeholder="报表、图表、混合表" clearable autosize
                                                      resize ="both" tabindex=6
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="导出文件名称" prop="exportName">
                                            <file-tip content="默认为模板名称"></file-tip>
                                            <el-input type="input" v-model="modelFile.exportName"
                                                      placeholder="默认为模板名称" clearable autosize
                                                      resize ="both" tabindex=7
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="导出文件类型" prop="exportFileType">
                                            <file-tip content="xls、pdf"></file-tip>
                                            <el-input type="input" v-model="modelFile.exportFileType"
                                                      placeholder="xls、pdf" clearable autosize
                                                      resize ="both" tabindex=8
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="是否分页" prop="isPagenation">
                                            <file-tip content="是否分页"></file-tip>
                                            <el-input type="input" v-model="modelFile.isPagenation"
                                                      placeholder="是否分页" clearable autosize
                                                      resize ="both" tabindex=9
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="11">
                                    <el-form-item label="一页展示条数" prop="displayNum">
                                        <el-input type="number" step="1" v-model="modelFile.displayNum"
                                                  placeholder="分页展示,一页展示的条数" clearable autosize
                                                  resize ="both" tabindex=10
                                                          maxlength=255
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="是否添加检索" prop="isSearch">
                                            <file-tip content="是否添加检索"></file-tip>
                                            <el-input type="input" v-model="modelFile.isSearch"
                                                      placeholder="是否添加检索" clearable autosize
                                                      resize ="both" tabindex=11
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                <el-col :span="22">
                                    <el-form-item label="备注" prop="remark">
                                        <file-tip content="备注"></file-tip>
                                            <el-input type="textarea" v-model="modelFile.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                    <el-col :span="11">
                        <el-form-item>
                            <el-button type="primary" @click="submitModelFile()"    :loading="isSubmiting" v-permission:simple_report_ModelFile_Edit >提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>




import {ModelFileService} from './ModelFileService'
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
                modelKey: [
                    {required:  true , message: '请输入模板唯一标识', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                modelName: [
                    {required:  true , message: '请输入模板名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                category: [
                    {required:  false , message: '请输入分类目录', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                modelType: [
                    {required:  false , message: '请输入模板类别', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                exportName: [
                    {required:  false , message: '请输入导出文件名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                exportFileType: [
                    {required:  false , message: '请输入导出文件类型', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                isPagenation: [
                    {required:  false , message: '请输入是否分页', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                displayNum: [

                    {required:  false , message: '请输入一页展示条数', trigger: 'blur'},
                    { validator: validateIntRange(-9223372036854775808,9223372036854775807), trigger: 'blur' },
                    ],
                isSearch: [
                    {required:  false , message: '请输入是否添加检索', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            modelFile:{},
            modelFileId:null,
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
        submitModelFile() {
            var refs = this.$refs;
            refs['modelFileForm'].validate(valid => {
            if (valid) {
            if(this.modelFile.eid)//编辑模板文件
            {
            this.updateModelFile();
            }
            else//保存模板文件
            {
            this.saveModelFile();
            }
            } else {
            return false
            }
            })
        },
        saveModelFile()//保存模板文件
        {
            this.isSubmiting = true;
            this.buttonRequestProgressStart("正在保存,请稍后...");
            ModelFileService.saveModelFile(this.modelFile).then((resp) => {
                this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/report/modelFile'})
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
        updateModelFile()//编辑模板文件
        {
            this.isSubmiting = true;
            this.buttonRequestProgressStart("正在更新,请稍后...");
            ModelFileService.updateModelFile(this.modelFile).then((resp) => {
                this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/report/modelFile'})
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
        findModelFileForEdit(modelFileId)//查找模板文件
        {
            ModelFileService.findModelFileForEdit(modelFileId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询模板文件出错'
        })
        })
        },
        createModelFile()//创建新的模板文件
        {
            ModelFileService.createModelFile().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的模板文件出错'
        })
        })
        },
        prepareForEdit(modelFileEditDto)
        {
            this.modelFile = modelFileEditDto.modelFile;

        },

    },
    created() {
        this.modelFileId = this.$route.params.modelFileId;
        if(this.modelFileId)//编辑
        {
            this.findModelFileForEdit(this.modelFileId);
        }
        else//新增
        {
            this.createModelFile();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
