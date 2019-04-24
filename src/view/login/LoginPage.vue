<template>
  <div class="mh-login">
    <div class="form" >
      <el-form v-if="login" :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
               class="login-container">
        <div class="head">
          <el-form-item prop="userName" >
            <el-input
              type="text"
              v-model="loginForm.userName"
              ref="adminput"
              auto-complete="off"
              placeholder="用户名">
              <i slot="prefix" class="icon icon-userName"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom: 45px">
            <el-input
              type="password"
              v-model="loginForm.password"
              auto-complete="off"
              placeholder="密码"
            >
              <i slot="prefix" class="icon icon-password"></i>
            </el-input>
          </el-form-item>
        </div>
        <div v-if="hasVertify">
          <el-form-item prop="captcha">
            <div class="wrapper">
              <el-input
                type="text"
                v-model="loginForm.captcha"
                auto-complete="off"
                placeholder="验证码"
                style="width: 45%"
              ></el-input>
              <img :src=src style="width: 45%;" @click="changeCaptcha"/>
            </div>
          </el-form-item>
          <el-form-item label="">
            <div class="wrapper">
              <el-checkbox
                label="记住我" name="type" v-model="loginForm.remember">
              </el-checkbox>
              <span @click="changeCaptcha">看不清楚，换一张</span>
            </div>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            class="btn"
            type="primary"
            @click.native.prevent="submitForm"
            :loading="loading"
          >登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <div class="wrapper">
            <span>忘记密码?</span>
            <span @click="goEmpRegiste()">去注册</span>
          </div>
        </el-form-item>
      </el-form>
      <el-form v-else class="login-container">
        <el-row class="title">请选择单位：</el-row>
        <el-row v-for="item in organizations" :key="item.eid">
          <el-radio class="organization" v-model="organization" :label="item" border>
            {{item.name}}
          </el-radio>
        </el-row>
        <el-button class="organizationButton" type="primary" @click="setOrganization">确定</el-button>
      </el-form>
    </div>

  </div>
</template>

<script>
  import {version} from '../../../package'
  import {LoginService} from "./loginService";
  import ElRow from "element-ui/packages/row/src/row";
  import crypto from 'crypto';

  export default {
    name: 'Login',
    components: {ElRow},
    /** state 默认信息 */
    data() {
      return {
        login: true,
        loading: false,
        pass: '',
        organization: '',
        organizations: [],
        hasVertify:"",
        version,
        loginForm: {
          userName: '',
          password: '',
          captcha: '',
          organizationId: '',
          remember: false
        },
        src: '',
        rules: {
          userName: [
            {required: true, message: '请输入登录用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'change'}
          ],
          captcha: [
            {required: true, message: '请输入验证码', trigger: 'change'}
          ]
        }
      }
    },
    created() {
      window.addEventListener('keydown', this.Enter);
      this.getUser();
      this.changeCaptcha();
    },
    /** 计算属性 */
    computed: {},
    /** 完成挂载 */
    mounted() {
      this.$refs['adminput'].focus();
    },
    destroyed() {
      window.removeEventListener('keydown', this.Enter)
    },
    /** 方法事件 */
    methods: {
      Enter(e) {
        if (!!this.loginForm.userName && e.which === 13) {
          this.submitForm()
        }
      },
      getUser() {
        // this.loginForm = this.$store.getters.accountPwd
      },
      submitForm() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.pass = this.loginForm.password
            let md5 = crypto.createHash("md5");
            md5.update(this.loginForm.password);
            let password = md5.digest('hex');
            this.loginForm.password = password
            LoginService.getOrganizations(this.loginForm).then(res => {
              if(res.data.count<3)
                this.hasVertify=false;
              else{
                this.hasVertify=true;
                this.changeCaptcha();
              }
              if (res.data.captcha||!this.hasVertify) {
                if (res.data.isLogin) {
                  this.organizations = res.data.organizations
                  this.organization = this.organizations[0]
                  if (this.organizations.length == 1) {
                    this.loginForm.organizationId = this.organization.eid
                    this.loginForm.password = this.pass
                    this.$store.dispatch('accountLoginSubmit', this.loginForm).then(() => {
                      this.$store.getters.userInfo.currentOrganization = this.organization
                      this.loading = false;
                      this.$router.push({path: '/'})
                    }).catch(() => {
                      this.loading = false;
                      this.changeCaptcha();
                    })
                  } else {
                    this.login = false
                  }
                } else {
                  this.$message({
                    type: 'error',
                    message: '账号或密码错误,请重新输入'
                  })
                }
              } else {
                this.$message({
                  type: 'error',
                  message: '验证码错误'
                })
              }
              this.loading = false;
            }).catch(() => {
              this.loading = false;
              this.changeCaptcha();
            })
          } else {
            return false
          }
        })
      },
      setOrganization() {
        this.loginForm.organizationId = this.organization.eid
        this.loginForm.password = this.pass
        this.$store.dispatch('accountLoginSubmit', this.loginForm).then(() => {
          this.$store.getters.userInfo.currentOrganization = this.organization
          this.loading = false;
          this.$router.push({path: '/'})
        }).catch(() => {
          this.loading = false;
          this.changeCaptcha();
        })
      },
      goEmpRegiste() {
        this.$router.push({path: '/EmployeeRegistForm', query: {}});
      },
      //更新验证码
      changeCaptcha() {
        LoginService.hasVertify().then(res => {
          this.hasVertify=res.data;
          if(this.hasVertify){
            this.src = process.env.BASE_SIMPLE_API + "/Captcha/getCaptcha?" + new Date();
          }
        }).catch(err=>{

        });

      }
    },
  }
</script>

<style lang="scss" scoped>
  .title {
    text-align: center;
    font-size: 20px;
  }

  .organization {
    margin-top: 10px;
    width: 250px;
  }

  .organizationButton {
    margin-top: 30px;
    width: 250px;
  }

  .mh-login {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: #ebebeb;
    min-width: 1000px;
    .form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 960px;
      }
    }
  }

  .login-container {
    border-radius: 5px;
    -moz-border-radius: 5px;
    width: 45%;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, 0.9);
    min-width: 270px;
  }

  .icon {
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    display: block;
    position: absolute;
    left: 8px;
    z-index: 1;
    width: 25px;
    height: 100%;
  }

  .icon-userName {
    background-image: url("../../assets/images/用户.png");
  }

  .icon-password {
    background-image: url("../../assets/images/密码.png");
  }

  .btn {
    width: 100%;
    height: 45px !important;
    border-radius: 0px;
    font-size: 21px;
    text-indent: 26px;
    letter-spacing: 26px;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    font-size: 17px;
    color: #d70000;
    letter-spacing: 2px;
  }


</style>

<style lang="scss">
  .mh-login {
    .el-input__inner {
      height: 45px !important;
      line-height: 45px !important;
      background: #f4f4f4;
      border-radius: 0px;
      font-size: 17px;
      border: 1px solid #b7b7b7;
    }
    .head {
      .el-input__inner {
        padding-left: 50px !important;
      }
    }

    .el-checkbox__inner {
      width: 25px;
      height: 26px;
      border: 1px solid #b7b7b7;
    }

    .el-checkbox__inner::after {
      height: 14px;
      left: 8px;
      position: absolute;
      top: 2px;
      width: 6px;
    }

    .el-checkbox__label {
      font-size: 17px !important;
      letter-spacing: 2px;
    }
  }

</style>

