<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card card-head" style="margin: 0px; width: 100%; min-height: 99%">
      <el-row>
        <el-col :span="5">
          <el-tree
            :data="menus"
            :props="defaultProps"
            :accordion="true"
            @node-click="handleNodeClick">
          </el-tree>
        </el-col>
        <el-col :span="18" :offset="1">
          <div style="float: left">
            <div style="margin-bottom: 15px;line-height: 15px;">
              <span style="color: #E6A23C;">请选择左侧组织查看具体角色</span>
            </div>
            <el-transfer
              filterable
              filter-placeholder="请输入角色名称"
              :titles="['待分配角色', '已分配角色']"
              v-model="roleData"
              @change="handleChange"
              :data="roleDataTable">
            </el-transfer>
          </div>
          <div style="float: left;margin-left: 10px">
            <el-button class="permission-button" type="primary" @click="updateOperatorAndRole">确 定</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {OrganizationService} from '../../simple/organization/OrganizationService'
  import {RoleService} from '../../simple/permission/RoleService'
  import {OperatorAndRoleService} from '../../simple/permission/OperatorAndRoleService'

  export default {
    data() {
      return {
        menus: [],
        roleData: [],
        roleDataTable: [],
        allRoles: [],
        currentRoles: [],
        removeRoles: [],
        addRoles: [],
        currentEditId: '',
        organizationId: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      };
    },
    mounted() {
      this.currentEditId = this.$route.params.operatorId;
      this.init()
    },
    methods: {
      init() {
        OrganizationService.findAllOrganizations().then(res => {
          this.menus = res.data
        })
        this.findAllRoles()
      },
      //查询所有角色
      findAllRoles() {
        this.buttonRequestProgressStart("");
        RoleService.findAllRoles().then((res) => {
          this.buttonRequestProgressClose();
          this.allRoles = res.data
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //根据操作员Id和单位ID查询对应的角色
      findOperatorAndRoleByOperatorIdAndOrganizationId() {
        this.buttonRequestProgressStart("");
        OperatorAndRoleService.findOperatorAndRoleByOperatorIdAndOrganizationId(this.currentEditId, this.organizationId).then((res) => {
          this.buttonRequestProgressClose();
          this.initRoleData(res.data)
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //初始化角色选择框数据
      initRoleData(data) {
        this.currentRoles = data
        let _this = this
        this.allRoles.forEach(function (item) {
          _this.roleDataTable.push({
            key: item.eid,
            label: item.name,
            disabled: false
          })
        })
        data.forEach(function (item) {
          _this.roleData.push(item.roleId)
        })
      },
      //更新操作员角色
      updateOperatorAndRole() {
        let parms = {
          operatorId: this.currentEditId,
          organizationId: this.organizationId,
          addRoles: this.addRoles,
          removeRoles: this.removeRoles,
        }
        OperatorAndRoleService.updateOperatorAndRole(parms).then((res) => {
          this.removeRoles = []
          this.addRoles = []
          this.$message({
            type: 'success',
            message: '分配成功！'
          })
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      //点击模块树触发
      handleNodeClick(data) {
        this.organizationId = data.eid
        this.removeRoles = []
        this.addRoles = []
        this.roleDataTable = []
        this.roleData = []
        this.findOperatorAndRoleByOperatorIdAndOrganizationId()
      },
      //选择角色
      handleChange(value, direction, movedKeys) {
        let _this = this
        //分配角色
        if (direction == "right") {
          movedKeys.forEach(function (item) {
            let removeIndex = _this.removeRoles.indexOf(item)
            let addIndex = _this.addRoles.indexOf(item)
            if (removeIndex > -1) {
              _this.removeRoles.splice(removeIndex, 1);
            }
            if (addIndex == -1 && removeIndex == -1) {
              _this.addRoles.push(item)
            }
          })
        }
        //删除角色
        if (direction == "left") {
          movedKeys.forEach(function (item) {
            let removeIndex = _this.removeRoles.indexOf(item)
            let addIndex = _this.addRoles.indexOf(item)
            if (addIndex > -1) {
              _this.addRoles.splice(addIndex, 1)
            }
            if (addIndex == -1 && removeIndex == -1) {
              _this.removeRoles.push(item)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
