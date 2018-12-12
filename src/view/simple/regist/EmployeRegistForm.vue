<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/EmployeeRegistForm' }">个人注册</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/OrganizationRegistForm' }"><a style="cursor: pointer">机构注册</a></el-breadcrumb-item>
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
        <el-form ref="employeRegistForm" :model="employeRegist" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="机构名称" prop="organizationName">
              <el-input type="input" v-model="employeRegist.organizationName"
                        placeholder="机构名称" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input type="input" v-model="employeRegist.name"
                        placeholder="名称" clearable autosize
                        resize="both" tabindex=1
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="linkTel">
              <el-input type="input" v-model="employeRegist.linkTel"
                        placeholder="联系电话" clearable autosize
                        resize="both" tabindex=2
                        maxlength=100
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input id="password" type="password" v-model="employeRegist.password"
                        placeholder="密码" clearable autosize
                        resize="both" tabindex=4
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input type="input" v-model="employeRegist.email"
                        placeholder="邮箱" clearable autosize
                        resize="both" tabindex=5
                        maxlength=100
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认密码" prop="isPassword">
              <el-input type="password" v-model="employeRegist.isPassword"
                        placeholder="确认密码" clearable autosize
                        resize="both" tabindex=6
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="验证码" prop="inputEmailCode">
              <el-input type="input" v-model="employeRegist.inputEmailCode"
                        placeholder="请输入邮箱验证码" clearable autosize
                        resize="both" tabindex=5
                        maxlength=100
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button :disabled="isDisabled" style="margin-left: -140px" @click="sendCode()" type="primary">{{buttonName}}</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="saveEmployeRegist()" :loading="isSubmiting">注册</el-button>
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


  import {EmployeeService} from '../../simple/organization/EmployeeService'
  import {EmployeRegistService} from './EmployeRegistService'
  import {OrganizationRegistService} from './OrganizationRegistService'
  import {d4utils} from '../../../tools/d4utils'
  import crypto from 'crypto'

  export default {
    components: {},
    data() {
      var validateIntRange = d4utils.validateFloatRange;
      var validateFloatRange = d4utils.validateFloatRange;
      var validateString = d4utils.validateString;

      return {
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          linkTel: [
            {required: false, message: '请输入联系电话', trigger: 'blur'},
            {validator: validateString(0, 1000, /^1[3|4|5|7|8]\d{9}$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          organizationName: [
            {required: true, message: '请输入机构名称', trigger: 'blur'},
            {validator: this.checkOrgName(0, 1000, /^.*$/, "该机构不存在"), trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validateString(0, 1000, /^.*$/, "输入的数据不正确，请检查"), trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {
              validator: validateString(0, 1000, /^\w+([\.\-]\w+)*\@\w+([\.\-]\w+)*\.\w+$/, "输入的数据不正确，请检查"),
              trigger: 'blur'
            },
          ],
          isPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: this.checkPassword(0, 1000, /^.*$/, "两次输入的密码不一致，请重新输入"), trigger: 'blur'},
          ],
          inputEmailCode: [
            {required: true, message: '请输入邮箱验证码', trigger: 'blur'},
            {validator: this.checkEmailCode(0, 1000, /^.*$/, "验证码错误，请重新输入"), trigger: 'blur'},
          ]
        },
        curCount:20,
        buttonName: "发送邮件",
        isDisabled:false,
        inputEmailCode:"",//前台录入的验证码
        rightEmailCode:"",//后台验证码
        isPassword: "",
        isSubmiting: false,
        employeRegist: {},
        employeRegistId: null,
        alerts: {
          successes: [], //TODO:[{title:'消息内容'},]
          infos: [],
          warnings: [],
          errors: []
        },
      }
    },

    methods: {
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
                callback();
                return;
              }
              else {
                callback(new Error(patternMessage));
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
            }
            else if(this.rightEmailCode != v1){
              callback(new Error(patternMessage));
            }
            else {
              callback();
            }
          })
        }
      },
      sendCode(){
        if(this.employeRegist.email != null && this.employeRegist.email != undefined){
          let me = this;
          me.isDisabled = true;
          let InterValObj = window.setInterval(function(){
            if (me.curCount == 1) {
              window.clearInterval(InterValObj);//停止计时器
              me.buttonName="发送邮件";
              me.isDisabled = false;
              me.curCount = 20;
              this.rightEmailCode = "";
            }
            else {
              me.curCount--;
              me.buttonName = me.curCount+"秒后重新发送";
            }
          }, 1000); //启动计时器，1秒执行一次

          EmployeRegistService.sendEmailCode(this.employeRegist.email).then((resp) => {
            this.rightEmailCode = resp.data;
          }).catch((error) => {
            this.$message({
              type: 'error',
              message: '验证码发送出错,原因是：' + error.data.message
            })
          })
        }
      },
      saveEmployeRegist()//保存人员注册
      {
        this.$refs["employeRegistForm"].validate(valid => {
          if (valid) {
            this.isSubmiting = true;
            let md5 = crypto.createHash("md5");
            md5.update(this.employeRegist.password);
            let password = md5.digest('hex');
            this.employeRegist.password = password;

            EmployeRegistService.saveEmployeRegist(this.employeRegist).then((resp) => {
              this.isSubmiting = false;
              var router = this.$router;
              router.push({path: '/simple/regist/employeRegist'})
            }).catch((error) => {
              //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
              this.isSubmiting = false;

              this.$message({
                type: 'error',
                message: '保存出错,原因是：' + error.data.message
              })
            })
          }
        })
      },
      returnLogin(){
        var router = this.$router;
        router.push({path: '/login'})
      },
      prepareForEdit(employeRegistEditDto) {
        this.employeRegist = employeRegistEditDto.employeRegist;

        this.sexCodeTables = employeRegistEditDto.sexCodeTables;
        this.auditEmloyeeEmployees = employeRegistEditDto.auditEmloyeeEmployees
      },
      searchAuditEmloyeeName(queryString, cb) {
        var auditEmloyeeEmployees = this.auditEmloyeeEmployees;

        //如果不为空，说明在加载页面的时候已经加载了所有的外键数据，否则表示没加载，则根据输入的信息从后台加载
        if (auditEmloyeeEmployees) {
          var results = queryString ? auditEmloyeeEmployees.filter(this.createFilterAuditEmloyeeName(queryString)) : auditEmloyeeEmployees;
          cb(results);
        }
        else {
          var results = d4utils.getObjectCached("findEmployeesWithIdNameByName_" + queryString);
          if (results) {
            cb(results);
          }
          else {
            var cb1 = cb;
            EmployeeService.findEmployeesWithIdNameByName(queryString).then((resp) => {
              if (resp.data) {
                var results = resp.data;
                d4utils.cacheObject("findEmployeesWithIdNameByName_" + queryString);
                cb1(results)
              }
              else {
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
      createFilterAuditEmloyeeName(queryString) {
        return (employee) => {
          return (employee.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
      handleSelectAuditEmloyeeName(item) {
        this.employeRegist.auditEmloyeeId = item.eid;
      },
    },
    created() {

    },
  }
</script>
<style scoped lang="scss">
  .el-breadcrumb {
    font-size: 16px;
    line-height: 5;
    margin-left: 20px;
  }
</style>
