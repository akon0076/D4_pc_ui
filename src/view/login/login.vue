<template>
  <div class="mh-login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
             class="demo-loginForm login-container">
      <h3 class="mh-login-title">系统登录</h3>
      <el-form-item prop="userName">
        <el-input
          type="text"
          v-model="loginForm.userName"
          ref="adminput"
          auto-complete="off"
          placeholder="请输入用户名">
          <i slot="prefix" class="icon iconfont icon-my"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入密码"
        >
          <i slot="prefix" class="icon iconfont icon-jiesuo"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox
          label="记住密码" name="type" v-model="loginForm.remember"
          style="text-align: left">
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%;"
          type="primary"
          @click.native.prevent="submitForm"
          :loading="loading">登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <span @click="goOrgRegiste()" style="color: red;cursor: pointer;margin-left: 50%">机构注册</span>
        <span @click="goEmpRegiste()" style="color: red;cursor: pointer;margin-left: 10%">人员注册</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {version} from '../../../package'

  export default {
    name: 'Login',
    components: {},
    /** state 默认信息 */
    data() {
      return {
        loading: false,
        version,
        loginForm: {
          userName: '',
          password: '',
          remember: false
        },
        rules: {
          userName: [
            {required: true, message: '请输入登录用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'change'}
          ],
        }
      }
    },
    created() {
      window.addEventListener('keydown', this.Enter);
      this.getUser();
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
              this.$store.dispatch('accountLoginSubmit', this.loginForm).then(() => {
              this.loading = false;
              this.$router.push({path: '/'})
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      goOrgRegiste(){
        this.$router.push({path: '/organizationRegistForm', query: {}});
      },
      goEmpRegiste(){
        this.$router.push({path: '/EmployeeRegistForm', query: {}});
      }
    },
  }
</script>

<style lang="scss" scoped>
  .mh-login {
    width: 100%;
    height: 100%;
    //background-image: url("../../assets/images/jiaoShi.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-width: 1000px;
    .el-form-item {
      .el-form-item__content {
        .icon {
          position: absolute;
          left: 8px;
          z-index: 1;
          display: inline-block;
          height: 100%;
          line-height: 36px;
        }
      }
    }
    &-title {
      margin-bottom: 10px;
      text-align: center;
    }

    &-footer {
      font-size: 14px;
      color: #606266;
    }
  }

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, .9);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    overflow: hidden;
    min-width: 270px;
    .title {
      text-align: center;
      color: #505458;
    }
  }
</style>
