
<template>
    <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
        <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
            <div slot="header" class="clearfix">
                <span>商家注册</span>
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
                <el-form ref="memberRegistForm" :model="memberRegist" label-width="150px" :rules="rules">
                                   <!-- <el-col :span="11">
                                        <el-form-item label="名称" prop="name">
                                            <file-tip content="名称"></file-tip>
                                            <el-input type="input" v-model="memberRegist.name"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=1
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="唯一键" prop="onlyCode">
                                            <file-tip content="唯一键"></file-tip>
                                            <el-input type="input" v-model="memberRegist.onlyCode"
                                                      placeholder="唯一键" clearable autosize
                                                      resize ="both" tabindex=3
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>-->
                                    <el-col :span="11">
                                      <el-form-item label="账号" prop="memberCode">
                                        <file-tip content="账号"></file-tip>
                                        <el-input type="input" v-model="memberRegist.memberCode"
                                                  placeholder="账号" clearable autosize
                                                  resize ="both" tabindex=5
                                                  maxlength=255
                                        ></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="密码" prop="password">
                                            <file-tip content="密码"></file-tip>
                                            <el-input type="input" v-model="memberRegist.password"
                                                      placeholder="密码" clearable autosize
                                                      resize ="both" tabindex=4
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="名称" prop="memberName">
                                            <file-tip content="名称"></file-tip>
                                            <el-input type="input" v-model="memberRegist.memberName"
                                                      placeholder="名称" clearable autosize
                                                      resize ="both" tabindex=6
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="联系人" prop="person">
                                            <file-tip content="联系人"></file-tip>
                                            <el-input type="input" v-model="memberRegist.person"
                                                      placeholder="联系人" clearable autosize
                                                      resize ="both" tabindex=7
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="联系电话" prop="phone">
                                            <file-tip content="联系电话"></file-tip>
                                            <el-input type="input" v-model="memberRegist.phone"
                                                      placeholder="联系电话" clearable autosize
                                                      resize ="both" tabindex=8
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-form-item label="地址" prop="address">
                                            <file-tip content="地址"></file-tip>
                                            <el-input type="input" v-model="memberRegist.address"
                                                      placeholder="地址" clearable autosize
                                                      resize ="both" tabindex=9
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>
                                  <!--  <el-col :span="11">
                                        <el-form-item label="审核状态" prop="auditState">
                                            <file-tip content="审核状态"></file-tip>
                                            <el-input type="input" v-model="memberRegist.auditState"
                                                      placeholder="审核状态" clearable autosize
                                                      resize ="both" tabindex=10
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                    </el-col>-->
                                <!--<el-col :span="22">
                                    <el-form-item label="备注" prop="remark">
                                        <file-tip content="备注"></file-tip>
                                            <el-input type="textarea" v-model="memberRegist.remark"
                                                      placeholder="备注" clearable autosize
                                                      resize ="both" tabindex=10000
                                                              maxlength=255
                                            ></el-input>
                                    </el-form-item>
                                </el-col>-->
                    <el-col :span="11">
                        <el-form-item>
                            <el-button type="primary" @click="submitMemberRegist()"    :loading="isSubmiting" >注册</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
          <!--  <div class="text item clearfix">
                <el-alert v-for="remark in alerts.remarks"  :key="remark.title"
                          v-bind:title="remark.title"
                          type="info"
                          v-bind:description="remark.content">
                </el-alert>
            </div>-->
        </el-card>
    </div>
</template>

<script>




import {MemberRegistService} from './MemberRegistService'
import {d4utils} from '../../../tools/d4utils'
    import fileTip from '@/components/tip/fileTip'
import crypto from 'crypto'
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
            /*    name: [
                    {required:  false , message: '请输入名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                onlyCode: [
                    {required:  true , message: '请输入唯一键', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                password: [
                    {required:  true , message: '请输入密码', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],*/
                memberCode: [
                    {required:  true , message: '请输入账号名', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                memberName: [
                    {required:  true , message: '请输入名称', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                person: [
                    {required:  true , message: '请输入联系人', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                phone: [
                    {required:  true , message: '请输入联系电话', trigger: 'blur'},
                    { validator: validateString(0, 1000, /^1[3|4|5|7|8]\d{9}$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                address: [
                    {required:  true , message: '请输入地址', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                auditState: [
                    {required:  false , message: '请输入审核状态', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
                remark: [
                    {required:  false , message: '请输入备注', trigger: 'blur'},
                    { validator:validateString(0,1000,/^.*$/,"输入的数据不正确，请检查"), trigger: 'blur' },
                    ],
           },
            isSubmiting: false,
            memberRegist:{},
            memberRegistId:null,
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
        submitMemberRegist() {
            var refs = this.$refs;
            refs['memberRegistForm'].validate(valid => {
            if (valid) {
            if(this.memberRegist.eid)//编辑商家注册审核
            {
            this.updateMemberRegist();
            }
            else//保存商家注册审核
            {
            this.saveMemberRegist();
            }
            } else {
            return false
            }
            })
        },
        saveMemberRegist()//保存商家注册审核
        {
            this.isSubmiting = true;
          let md5 = crypto.createHash("md5");
          md5.update(this.memberRegist.password);
          let password = md5.digest('hex');
          this.memberRegist.password = password;
          this.buttonRequestProgressStart("正在保存,请稍后...");
            MemberRegistService.saveMemberRegist(this.memberRegist).then((resp) => {
              this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/wisdomCateringLogin'})
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
        updateMemberRegist()//编辑商家注册审核
        {
            this.isSubmiting = true;
          this.buttonRequestProgressStart("正在更新,请稍后...");
            MemberRegistService.updateMemberRegist(this.memberRegist).then((resp) => {
              this.buttonRequestProgressClose();
                this.isSubmiting = false;
                var router = this.$router;
                router.push({path: '/simple/regist/memberRegist'})
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
        findMemberRegistForEdit(memberRegistId)//查找商家注册审核
        {
            MemberRegistService.findMemberRegistForEdit(memberRegistId).then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '查询商家注册审核出错'
        })
        })
        },
        createMemberRegist()//创建新的商家注册审核
        {
            MemberRegistService.createMemberRegist().then((resp) => {
                this.prepareForEdit(resp.data);
        }).catch((error) => {
            this.$message({
            type: 'error',
            message: '创建新的商家注册审核出错'
        })
        })
        },
        prepareForEdit(memberRegistEditDto)
        {
            this.memberRegist = memberRegistEditDto.memberRegist;

        },

    },
    created() {
        this.memberRegistId = this.$route.params.memberRegistId;
        if(this.memberRegistId)//编辑
        {
            this.findMemberRegistForEdit(this.memberRegistId);
        }
        else//新增
        {
            this.createMemberRegist();
        }
    },
}
</script>
<style scoped lang="scss">

</style>
