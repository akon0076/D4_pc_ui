
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
                <el-form ref="codeTableForm" :model="codeTable" label-width="150px" :rules="rules">
                                    <el-col :span="12">
                                        <el-form-item label="名称" prop="name">
                                            <el-input type="input" v-model="codeTable.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=3
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="码表全名" prop="fullname">
                                            <el-input type="input" v-model="codeTable.fullname"
                                                      placeholder="为码表类型名称加所有父级名称,加本级名称" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=200
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="码表类型" prop="codeType">
                                            <el-input type="input" v-model="codeTable.codeType"
                                                      placeholder="码表种类" clearable autosize
                                                      resize ="both" tabindex=5
                                                              maxlength=100
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="父级" prop="parentFullname">
                                            <el-input type="input" v-model="codeTable.parentFullname"
                                                      placeholder="父级" clearable autosize
                                                      resize ="both" tabindex=6
                                                              maxlength=100
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>

                                <el-col :span="12">
                                    <el-form-item label="父级" prop="parentName">
                                        <el-autocomplete
                                                class="inline-input"
                                                value-key="name"
                                                v-model="codeTable.parentName"
                                                :fetch-suggestions="searchParentName "
                                                placeholder="父级"
                                                @select="handleSelectParentName"
                                                clearable autosize
                                                resize ="both" tabindex="7"
                                        ></el-autocomplete>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="显示顺序" prop="displayOrder">
                                        <el-input type="number" step="1" v-model="codeTable.displayOrder"
                                                  placeholder="显示顺序" clearable autosize
                                                  resize ="both" tabindex=8
                                                          maxlength=250
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="有子码表" prop="hasChildren">
                                        <el-radio-group v-model="codeTable.hasChildren">
                                            <el-radio-button :label="true">是</el-radio-button>
                                            <el-radio-button :label="false">否</el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="备注" prop="remark">

                                            <el-input type="textarea" v-model="codeTable.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-button type="primary" @click="submitCodeTable()"    :loading="isSubmiting" v-permission:simple_system_CodeTable_Edit >提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
            <div class="text item clearfix">
                <el-alert v-for="remark in alerts.remarks"  :key="remark.title"
                          v-bind:title="remark.title"
                          type="info"
                          v-bind:description="remark.description">
                </el-alert>
            </div>
        </el-card>
    </div>
</template>

<script>





import {CodeTableService} from './CodeTableService'
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
                fullname: [
                    {required:  true , message: '请输入码表全名', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                codeType: [
                    {required:  true , message: '请输入码表类型', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                parentFullname: [
                    {required:  false , message: '请输入父级', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                parentId: [
                    {required:  false , message: '请输入父级', trigger: 'blur'},
                    ],
                parentName: [
                    {required:  false , message: '请输入父级', trigger: 'blur'},
                    ],
                displayOrder: [
                    {required:  false , message: '请输入显示顺序', trigger: 'blur'},
                    { validator: validateIntRange(-2147483648,2147483647), trigger: 'blur' },
                    ],
                hasChildren: [

                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            codeTable:{},
            codeTableId:null,
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
        alerts:{ remarks:[{title:"功能说明",description:"TODO: 请在这里加上功能说明"},],
                successes:[], //TODO:[{title:'消息内容'},]
                infos:[],
                warnings:[],
                errors:[]},
        }
    },

    methods: {
        submitCodeTable() {
            var refs = this.$refs;
            refs['codeTableForm'].validate(valid => {
            if (valid) {
            if(this.codeTable.eid)//编辑码表
            {
            this.updateCodeTable();
            }
            else//保存码表
            {
            this.saveCodeTable();
            }
            } else {
            return false
            }
            })
        },
        saveCodeTable()//保存码表
        {
            this.isSubmiting = true;
          this.buttonRequestProgressStart("正在保存,请稍后...");
            CodeTableService.saveCodeTable(this.codeTable).then((resp) => {
              this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/codeTable'})
        }).catch((error) => {
              this.buttonRequestProgressClose();
            this.isSubmiting = false;
            this.$message({
            type: 'error',
            message: '保存出错'
        })
        })
        },
        updateCodeTable()//编辑码表
        {
            this.isSubmiting = true;
          this.buttonRequestProgressStart("正在更新,请稍后...");
            CodeTableService.updateCodeTable(this.codeTable).then((resp) => {
              this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/codeTable'})
        }).catch((error) => {
              this.buttonRequestProgressClose();
            this.isSubmiting = false;
            this.$message({
            type: 'error',
            message: '保存出错'
        })
        })
        },
        findCodeTableForEdit(codeTableId)//查找码表
        {
            CodeTableService.findCodeTableForEdit(codeTableId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询码表出错'
        })
        })
        },
        createCodeTable()//创建新的码表
        {
            CodeTableService.createCodeTable().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的码表出错'
        })
        })
        },
        prepareForEdit(codeTableEditDto)
        {
            this.codeTable = codeTableEditDto.codeTable;

            this.parentCodeTables = codeTableEditDto.parentCodeTables
        },


        searchParentName(queryString, cb) {
            var parentCodeTables = this.parentCodeTables;

            //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
            if(parentCodeTables)
            {
                var results = queryString ? parentCodeTables.filter(this.createFilterParentName(queryString)) : parentCodeTables;
                cb(results);
            }
            else
            {
                var results = d4utils.getObjectCached("findCodeTablesWithIdNameByName_"+queryString);
                if(results)
                {
                    cb(results);
                }
                else
                {
                    var cb1 = cb;
                    CodeTableService.findCodeTablesWithIdNameByName(queryString).then((resp) => {
                    if (resp.data)
                    {
                        var results = resp.data;
                        d4utils.cacheObject("findCodeTablesWithIdNameByName_"+queryString);
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







            createFilterParentName(queryString) {
                return (codeTable) => {
                    return (codeTable.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelectParentName(item){
                this.codeTable.parentId = item.eId;
            },
    },
    created() {
        this.codeTableId = this.$route.params.codeTableId;
        if(this.codeTableId)//编辑
        {
            this.findCodeTableForEdit(this.codeTableId);
        }
        else//新增
        {
            this.createCodeTable();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
