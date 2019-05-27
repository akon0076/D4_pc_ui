<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/simple/permission/Role' }">角色管理列表</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form ref="roleForm" :model="role" label-width="150px" :rules="rules">
          <el-col :span="12">
            <el-form-item label="角色编码" prop="code">
              <el-input type="input" v-model="role.code"
                        placeholder="角色编码" clearable autosize
                        resize="both" tabindex=3
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色名称" prop="name">
              <el-input type="input" v-model="role.name"
                        placeholder="角色名称" clearable autosize
                        resize="both" tabindex=4
                        maxlength=200
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">

              <el-input type="textarea" v-model="role.remark"
                        placeholder="备注" clearable autosize
                        resize="both" tabindex=10000
                        maxlength=255
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="submitRole()" :loading="isSubmiting"
                         v-permission:simple_permission_Role_Edit>提交
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>


  import {RoleService} from './RoleService'
  import {d4utils} from '../../../tools/d4utils'

  export default {
    components: {},
    data() {
      return {
        rules: {
          code: [
            {required: true, message: '请输入角色编码', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          remark: [
            {required: false, message: '请输入备注', trigger: 'blur'},
            {min: 0, max: 9999, message: '长度在 0 到 9999 个字符', trigger: 'blur'}
          ],
        },
        isSubmiting: false,
        role: {},
        roleId: null
      }
    },

    methods: {
      submitRole() {
        var refs = this.$refs;
        refs['roleForm'].validate(valid => {
          if (valid) {
            if (this.role.eid)//编辑角色
            {
              this.updateRole();
            }
            else//保存角色
            {
              this.saveRole();
            }
          } else {
            return false
          }
        })
      },
      saveRole()//保存角色
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在保存,请稍后...");
        RoleService.saveRole(this.role).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/permission/Role'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      updateRole()//编辑角色
      {
        this.isSubmiting = true;
        this.buttonRequestProgressStart("正在更新,请稍后...");
        RoleService.updateRole(this.role).then((resp) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          var router = this.$router;
          router.push({path: '/simple/permission/Role'})
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.isSubmiting = false;
          this.$message({
            type: 'error',
            message: '保存出错'
          })
        })
      },
      findRoleForEdit(roleId)//查找角色
      {
        RoleService.findRoleForEdit(roleId).then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询角色出错'
          })
        })
      },
      createRole()//创建新的角色
      {
        RoleService.createRole().then((resp) => {
          this.prepareForEdit(resp.data);
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '创建新的角色出错'
          })
        })
      },
      prepareForEdit(roleEditDto) {
        this.role = roleEditDto.role;

      },

    },
    created() {
      this.roleId = this.$route.params.roleId;
      if (this.roleId)//编辑
      {
        this.findRoleForEdit(this.roleId);
      }
      else//新增
      {
        this.createRole();
      }
    },
  }
</script>
<style scoped lang="scss">

</style>
