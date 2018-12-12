<template>
  <div class="mh-login">
    <div class="form">
      <img src="@/assets/images/智慧餐饮.png"/>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px"
               class="login-container">
        <div class="head">
          <el-form-item prop="userName" style="margin-bottom: 45px">
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
        <el-form-item prop="captcha">
          <div class="wrapper">
            <el-input
              type="text"
              v-model="loginForm.captcha"
              auto-complete="off"
              placeholder="验证码"
              style="width: 45%"
            ></el-input>
            <img :src=src style="width: 45%;"/>
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
    </div>

  </div>
</template>

<script>
  import {version} from '../../../../package'

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
          captcha: '',
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
              this.$store.dispatch('wisdomCateringAccountLoginSubmit', this.loginForm).then(() => {
              this.loading = false;
              this.$router.push({path: '/wisdomCateringMain'})
            }).catch(() => {
              this.loading = false;
              this.changeCaptcha();
            })
          } else {
            return false
          }
        })
      },
      goEmpRegiste() {
        this.$router.push({path: '/MemberRegistForm', query: {}});
      },
      //更新验证码
      changeCaptcha() {
        this.src =  process.env.BASE_SIMPLE_API + "/Captcha/getCaptcha?" + new Date();
      }
    },
  }
</script>

<style lang="scss" scoped>
  .mh-login {
    width: 100%;
    height: 100%;
    background-image: url("../../../assets/images/餐饮登录背景.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
    position: absolute;
    top: 7%;
    left: 45%;
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
    background-image: url("../../../assets/images/用户.png");
  }

  .icon-password {
    background-image: url("../../../assets/images/密码.png");
  }

  .btn {
    width: 100%;
    height: 45px !important;
    background: #1569ae;
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
