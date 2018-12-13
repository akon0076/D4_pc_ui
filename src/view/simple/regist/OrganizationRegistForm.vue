<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/OrganizationRegistForm' }">机构注册</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/EmployeeRegistForm' }"><a style="cursor: pointer">个人注册</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div class="alert-container clearfix">
        <el-alert v-for="alert in alerts.successes" :key="alert.title"
                  v-bind:title="alert.title"
                  type="success"
                  show-icon>
        </el-alert>
        <el-alert v-for="alert in alerts.infos" :key="alert.title"
                  v-bind:title="alert.title"
                  type="info"
                  show-icon>
        </el-alert>
        <el-alert v-for="alert in alerts.warnings" :key="alert.title"
                  v-bind:title="alert.title"
                  type="warning"
                  show-icon>
        </el-alert>
        <el-alert v-for="alert in alerts.errors" :key="alert.title"
                  v-bind:title="alert.title"
                  type="error"
                  show-icon>
        </el-alert>
      </div>
      <div class="text item">
        <el-form ref="organizationRegistForm" :model="organizationRegist" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="机构名称" prop="name">
              <el-input type="input" v-model="organizationRegist.name"
                        placeholder="机构名称" clearable autosize
                        resize="both" tabindex=1
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员名称" prop="adminName">
              <el-input type="input" v-model="organizationRegist.adminName"
                        placeholder="管理员名称" clearable autosize
                        resize="both" tabindex=13
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业执照号" prop="businessLicenseCode">
              <el-input type="input" v-model="organizationRegist.businessLicenseCode"
                        placeholder="营业执照号" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员手机" prop="adminLinkTel">
              <el-input type="input" v-model="organizationRegist.adminLinkTel"
                        placeholder="管理员手机" clearable autosize
                        resize="both" tabindex=14
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册资金(万元)" prop="amount">
              <el-input type="number" step="0.01" v-model="organizationRegist.amount"
                        placeholder="注册资金(万元)" clearable autosize
                        resize="both" tabindex=4
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="单位地址" prop="address">
              <el-input type="input" v-model="organizationRegist.address"
                        placeholder="单位地址" clearable autosize
                        resize="both" tabindex=5
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="adminPassword">
              <el-input id="password" type="password" v-model="organizationRegist.adminPassword"
                        placeholder="密码" clearable autosize
                        resize="both" tabindex=16
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法人" prop="legalPerson">
              <el-input type="input" v-model="organizationRegist.legalPerson"
                        placeholder="法人" clearable autosize
                        resize="both" tabindex=6
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="isPassword">
              <el-input type="password" v-model="organizationRegist.isPassword"
                        placeholder="确认密码" clearable autosize
                        resize="both" tabindex=16
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行业属性" prop="industryAttributes">
              <el-input type="input" v-model="organizationRegist.industryAttributes"
                        placeholder="行业属性" clearable autosize
                        resize="both" tabindex=7
                        maxlength=300
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司座机" prop="landline">
              <el-input type="input" v-model="organizationRegist.landline"
                        placeholder="公司座机" clearable autosize
                        resize="both" tabindex=8
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理员邮箱" prop="adminEmail">
              <el-input type="input" v-model="organizationRegist.adminEmail"
                        placeholder="管理员邮箱" clearable autosize
                        resize="both" tabindex=15
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="验证码" prop="inputEmailCode">
              <el-input type="input" v-model="organizationRegist.inputEmailCode"
                        placeholder="请输入邮箱验证码" clearable autosize
                        resize="both" tabindex=5
                        maxlength=100
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item>
              <el-button :disabled="isDisabled" style="margin-left: -140px" @click="sendCode()" type="primary">{{buttonName}}</el-button>
            </el-form-item>
          </el-col>
          <!--上传文件-->
          <el-col :span="6">
            <el-form-item label="营业执照" prop="imageName1">
              <el-input type="input" v-model="imageName1"
                        placeholder="营业执照" clearable autosize
                        resize="both" tabindex=8
                        maxlength=200 readonly="readonly"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-upload
              class="avatar-uploader button_left"
              action=""
              :disabled="false"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="changeFile1">
              <el-button type="text"><i class="el-icon-upload"></i>上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <el-button style="margin-left: -200px" @click="deleteFile(file1)" type="text"><i
                class="el-icon-delete"></i>移除</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="法人身份证" prop="imageName2">
              <el-input type="input" v-model="imageName2"
                        placeholder="法人身份证" clearable autosize
                        resize="both" tabindex=8
                        maxlength=200 readonly="readonly"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-upload
              class="avatar-uploader button_left"
              action=""
              :disabled="false"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="changeFile2">
              <el-button type="text"><i class="el-icon-upload"></i>上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <el-button style="margin-left: -200px" @click="deleteFile(file2)" type="text"><i
                class="el-icon-delete"></i>移除</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开户许可证" prop="imageName3">
              <el-input type="input" v-model="imageName3"
                        placeholder="开户许可证" clearable autosize
                        resize="both" tabindex=8
                        maxlength=200 readonly="readonly"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-upload
              class="avatar-uploader button_left"
              action=""
              :disabled="false"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="changeFile3">
              <el-button type="text"><i class="el-icon-upload"></i>上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <el-button style="margin-left: -200px" @click="deleteFile(file3)" type="text"><i
                class="el-icon-delete"></i>移除</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他附件" prop="imageName4">
              <el-input type="input" v-model="imageName4"
                        placeholder="其他附件" clearable autosize
                        resize="both" tabindex=8
                        maxlength=200 readonly="readonly"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-upload
              class="avatar-uploader button_left"
              action=""
              :disabled="false"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="changeFile4">
              <el-button type="text"><i class="el-icon-upload"></i>上传</el-button>
            </el-upload>
          </el-col>
          <el-col :span="16">
            <el-form-item>
              <el-button style="margin-left: -200px" @click="deleteFile(file4)" type="text"><i
                class="el-icon-delete"></i>移除</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="主营业务" prop="mainBusiness">

              <el-input type="textarea" v-model="organizationRegist.mainBusiness"
                        placeholder="主营业务" clearable autosize
                        resize="both" tabindex=10000
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="saveOrganizationRegist()" :loading="isSubmiting">注册</el-button>
              <el-button style="margin-left: 20px;" type="primary" @click="returnLogin()" :loading="isSubmiting">返回</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="text item clearfix">
        <el-alert v-for="remark in alerts.remarks" :key="remark.title"
                  v-bind:title="remark.title"
                  type="info"
                  v-bind:description="remark.content">
        </el-alert>
      </div>
    </el-card>
  </div>
</template>

<script>


  import {OrganizationRegistService} from './OrganizationRegistService'
  import {d4utils} from '../../../tools/d4utils'
  import crypto from 'crypto'
  import {EmployeRegistService} from './EmployeRegistService'

  export default {
    components: {},
    data() {
      var validateIntRange = d4utils.validateFloatRange;
      var validateFloatRange = d4utils.validateFloatRange;
      var validateString = d4utils.validateString;
      return {
        rules: {
          name: [
            {required: true, message: '请输入机构名称', trigger: 'blur'},
            {validator: this.checkOrgName(0, 1000, /^.*$/, "机构已存在，请重新输入"), trigger: 'blur'},
          ],
          businessLicenseCode: [
            {required: true, message: '请输入营业执照号', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          amount: [
            {required: true, message: '请输入注册资金(万元)', trigger: 'blur'},
            {validator: validateFloatRange(-9223372036854775808, 9223372036854775807), trigger: 'blur'},
          ],
          address: [
            {required: false, message: '请输入单位地址', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          legalPerson: [
            {required: false, message: '请输入法人', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          adminName: [
            {required: true, message: '请输入管理员名称', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          adminLinkTel: [
            {required: true, message: '请输入管理员手机', trigger: 'blur'},
            {validator: validateString(0, 1000, /^1[3|4|5|7|8]\d{9}$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          adminEmail: [
            {required: true, message: '请输入管理员邮箱', trigger: 'blur'},
            {
              validator: validateString(0, 1000, /^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/, "输入的数据不正确，请检查"),
              trigger: 'blur'
            },
          ],
          adminPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          isPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: this.checkPassword(0, 1000, /^.*$/, "两次输入的密码不一致，请重新输入"), trigger: 'blur'},
          ]
        },
        curCount:60,
        buttonName: "发送邮件",
        isDisabled:false,
        inputEmailCode:"",//前台录入的验证码
        rightEmailCode:"",//后台验证码
        isOrgName: {},
        password: "",
        isSubmiting: false,
        organizationRegist: {},
        organizationRegistId: null,
        imageName1: "",
        file1: '',
        imageName2: "",
        file2: '',
        imageName3: "",
        file4: '',
        imageName4: "",
        file4: '',
        pickerOptionsAuditDate: {
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
        alerts: {
          successes: [], //TODO:[{title:'消息内容'},]
          infos: [],
          warnings: [],
          errors: []
        },
      }

    },

    methods: {
      changeFile1(file) {
        this.file1 = file
        this.imageName1 = file.name
      },
      changeFile2(file) {
        this.file2 = file
        this.imageName2 = file.name
      },
      changeFile3(file) {
        this.file3 = file
        this.imageName3 = file.name
      },
      changeFile4(file) {
        this.file4 = file
        this.imageName4 = file.name
      },
      deleteFile(file) {
        if (this.file1.uid == file.uid) {
          this.file1 = '';
          this.imageName1 = '';
        }
        else if (this.file2.uid == file.uid) {
          this.file2 = '';
          this.imageName2 = '';
        }
        else if (this.file3.uid == file.uid) {
          this.file3 = '';
          this.imageName3 = '';
        }
        else {
          this.file4 = '';
          this.imageName4 = '';
        }
      },
      saveFile(organizationRegitId) {
        var name = "";
        var fileList = [];
        for (var i = 0; i < 4; i++) {
          if (this.file1 != '' && this.file1 != undefined) {
            fileList.push(this.file1.raw);
            name += "营业执照,";
            this.file1 = '';
          }
          else if (this.file2 != '' && this.file2 != undefined) {
            fileList.push(this.file2.raw);
            name += "法人身份证,";
            this.file2 = '';
          }
          else if (this.file3 != '' && this.file3 != undefined) {
            fileList.push(this.file3.raw);
            name += "开户许可证,";
            this.file3 = '';
          }
          else if (this.file4 != '' && this.file4 != undefined) {
            fileList.push(this.file4.raw);
            name += "其他附件,";
            this.file4 = '';
          }
        }
        if (fileList.length > 0) {
          name = (name.substring(name.length - 1) == ',') ? name.substring(0, name.length - 1) : name;
          var data = {name, associateFormId: organizationRegitId, associateFormName: 'simple_organizationRegit'};
          OrganizationRegistService.saveFile(data, fileList).then((resp) => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push({path: '/login'});
          })
        }
        else {
          this.$router.push({path: '/login'});
        }
      },
      checkOrgName(min, max, pattern, patternMessage) {//验证机构名称是否已存在

        var min = min;
        var max = max;
        return (rule, value, callback) => {

          var newValue = value;
          setTimeout(() => {
            if (!newValue) {
              if (min == 0) {
                callback();
                return
              }
              else {
                return callback(new Error('不能为空'));
              }
            }

            var v1 = newValue.trim();
            OrganizationRegistService.findOrganizationsWithIdNameByName(v1).then((resp) => {
              this.isOrgName = resp.data;
              if (this.isOrgName.size > 0) {
                callback(new Error(patternMessage));
                return;
              }
              else {
                callback();
              }
            })
          }, 500);
        };
      },
      checkPassword(min, max, pattern, patternMessage) {//验证密码是否一致
        var min = min;
        var max = max;
        return (rule, value, callback) => {

          var newValue = value;
          setTimeout(() => {
            if (!newValue) {
              if (min == 0) {
                callback();
                return
              }
              else {
                return callback(new Error('不能为空'));
              }
            }

            var v1 = newValue.trim();
            var adminPassword = document.getElementById("password").value;
            if (adminPassword != v1) {
              callback(new Error(patternMessage));
              return;
            }
            else {
              callback();
            }
          })
        }
      },
      checkEmailCode(min, max, pattern, patternMessage) {//验证码是否一致
        var min = min;
        var max = max;
        return (rule, value, callback) => {

          var newValue = value;
          setTimeout(() => {
            if (!newValue) {
              if (min == 0) {
                callback();
                return
              }
              else {
                return callback(new Error('不能为空'));
              }
            }

            var v1 = newValue.trim();
            if(this.rightEmailCode == "") {
              callback(new Error("验证码已过期"));
              return;
            }
            else if(this.rightEmailCode != v1){
              callback(new Error(patternMessage));
              return;
            }
            else {
              callback();
            }
          })
        }
      },
      sendCode(){
        if(this.organizationRegist.adminEmail != null && this.organizationRegist.adminEmail != undefined){
          let me = this;
          me.isDisabled = true;
          let InterValObj = window.setInterval(function(){
            if (me.curCount == 1) {
              window.clearInterval(InterValObj);//停止计时器
              me.buttonName="发送邮件";
              me.isDisabled = false;
              me.curCount = 60;
              this.rightEmailCode = "";
            }
            else {
              me.curCount--;
              me.buttonName = me.curCount+"秒后重新发送";
            }
          }, 1000); //启动计时器，1秒执行一次

          EmployeRegistService.sendEmailCode(this.organizationRegist.adminEmail).then((resp) => {
            this.rightEmailCode = resp.data;
          }).catch((error) => {
            this.$message({
              type: 'error',
              message: '验证码发送出错,原因是：' + error.data.message
            })
          })
        }
      },
      returnLogin(){
        var router = this.$router;
        router.push({path: '/login'})
      },
      saveOrganizationRegist()//保存单位注册
      {
        this.$refs["organizationRegistForm"].validate(valid => {
          if (valid) {
            this.isSubmiting = true;
            let md5 = crypto.createHash("md5");
            md5.update(this.organizationRegist.adminPassword);
            let password = md5.digest('hex');
            this.organizationRegist.adminPassword = password;
            this.buttonRequestProgressStart("正在保存,请稍后...");
            OrganizationRegistService.saveOrganizationRegist(this.organizationRegist).then((resp) => {
              this.buttonRequestProgressClose();
              if (resp.data != null) {
                console.log(resp.data);
                this.saveFile(resp.data.eid);
              }

            }).catch((error) => {
              this.buttonRequestProgressClose();
              //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
              this.$message({
                type: 'error',
                message: '保存出错,原因是：' + error.data.message
              })
            })
          }
        });

      }
    },
    created() {

    },
  }
</script>
<style scoped lang="scss">
  .button_left {
    margin-left: 10px;
  }

  .el-breadcrumb {
    font-size: 16px;
    line-height: 5;
    margin-left: 20px;
  }
</style>
