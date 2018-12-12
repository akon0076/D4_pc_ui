<template>
  <el-dialog
    v-drag-dialog
    title="修改密码"
    :visible.sync="dialogVisible"
    width="450px"
    :before-close="handleClose">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input type="password" v-model="ruleForm2.oldPwd" auto-complete="off"
                  placeholder="请输入您的登录密码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"
                  placeholder="请输入您的新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password"
                  placeholder="请确认您的新密码"
                  v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      dialogVisible: Boolean,
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (!(/^[0-9A-Za-z]{6,12}$/.test(value))) {
            callback(new Error('密码长度在6-12位之间'));
          } else if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (!(/^[0-9A-Za-z]{6,12}$/.test(value))) {
          callback(new Error('密码长度在6-12位之间'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validatePassOld = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        } else if (!(/^[0-9A-Za-z]{6,12}$/.test(value))) {
          callback(new Error('密码长度在6-12位之间'));
        }
        callback();
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          oldPwd: ''
        },
        rules2: {
          pass: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
          oldPwd: [
            {required: true, validator: validatePassOld, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const {oldPwd, pass} = this.ruleForm2;
            const {data} = await Ge.GE0001A05({newPassword: pass, password: oldPwd});
            console.log(data);
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClose() {
        this.$emit('handleClose')
      }
    }
  };
</script>
<style scoped lang="scss">
  .el-dialog__body {
    display: flex;
    justify-content: space-around;
  }
</style>
