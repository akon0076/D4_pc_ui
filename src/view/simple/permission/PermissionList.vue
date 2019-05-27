<template>
  <div class="spanControl-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>权限点管理</span>
      </div>
      <el-row>
        <el-col :span="4">
          <el-tree
            :data="menus"
            node-key="indexId"
            :props="defaultProps"
            :default-expanded-keys="[1]"
            @node-click="handleNodeClick">
          </el-tree>
        </el-col>
        <!--数据表格-->
        <el-col :span="19" :offset="1">
          <div style="float: left; margin-bottom: 15px;line-height: 36px;">
            <span style="color: #E6A23C;">请选择左侧模块树查看具体权限点</span>
          </div>
          <!--新增任务按钮-->
          <div style="float: right; margin-bottom: 15px">
            <el-button type="primary" @click="addPermission()" v-permission:simple_permission_Permission_Add>新增权限点
            </el-button>
          </div>
          <div class="table-control">
            <el-table v-loading="tableLoading" size="small" class="table-style" :data="permissions" border
                      highlight-current-row>
              <el-table-column show-overflow-tooltip align="left" prop="name" label="权限名称" min-width="100" fixed="left"
                               resizable show-overflow-tooltip>
                <template slot-scope="scope">
                  <p v-on:click="displayPermission(permissions[scope.$index].code)"
                     style="text-decoration: underline">
                    {{ permissions[scope.$index].name }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="left" class="setCenter" prop="code" label="权限编码" min-width="120" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" class="setCenter" prop="moduleName" label="所属模块" min-width="80" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" label="操作" min-width="80" resizable>
                <template slot-scope="scope" style="text-align: center;">
                  <template>
                    <el-button @click="editOrganation(permissions[scope.$index].code)" type="text" size="small"
                               v-permission:simple_permission_Permission_Edit>编辑
                    </el-button>
                  </template>
                  <template>
                    <el-button @click="deletePermission(permissions[scope.$index].code)" type="text" size="small"
                               v-permission:simple_permission_Permission_Delete><p
                      style="color: red !important;">删除</p></el-button>
                  </template>
                </template>
              </el-table-column>
            </el-table>

            <!--分页功能-->
            <div class="block">
              <el-pagination
                class="page-style" @size-change="changeSize" @current-change="changePage"
                background
                :current-page="currentPage"
                :page-sizes="[10, 15, 20, 25]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>
<script>
  import {mapState} from 'vuex';
  import {PermissionService} from './PermissionService';
  import {ModuleService} from './ModuleService';
  import downSearch from '@/components/select/downSearch'

  export default {
    components: {downSearch},
    data() {
      return {
        rules: {},
        menus: [],
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        permissions: [],
        allPermissions: [],
        currentModuleCode: '',
        tableLoading: false,
        defaultProps: {
          children: 'nodes',
          label: 'text'
        },
        value: '',
        search: '',
        selectValues: [
          {key: "name", value: "权限点名称"},
          {key: "code", value: "编码"},
          {key: "fullName", value: "全名"},
          {key: "moduleCode", value: "模块编码"},
          {key: "remark", value: "备注"},

        ],
        condition: ''
      }
    },
    created: function () {
      this.init();
    },
    methods: {
      init() {
        this.findPermissions();
        this.findAllTreeNode();
      },
      findAllTreeNode() {
        ModuleService.findAllTreeNode("电脑模块").then((res) => {
          this.menus = res.data.nodes
          this.setIndexId(this.menus, 1)
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: '查询模块树失败！'
          })
        })
      },
      setIndexId(data, indexId) {
        if (data && data.length > 0) {
          data.forEach(item => {
            item.indexId = indexId++
            this.setIndexId(item)
          })
        }
      },
      //点击模块树触发
      handleNodeClick(data) {
        this.currentModuleCode = data.id
        this.chageData()
      },
      searchByCondition(value) {
        this.currentPage = 1;
        this.condition = value;
        this.findPermissions();
      },
      refresh() {
        this.findPermissions();
      },
      findPermissions() {
        this.buttonRequestProgressStart("正在搜索,请稍后...");
        PermissionService.findAllPermissions().then((res) => {
          this.buttonRequestProgressClose();
          this.allPermissions = res.data;
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.$message({
            type: 'error',
            message: '查询权限点失败！'
          })
        })
      },
      displayPermission(code) {
        this.$router.push({path: '/simple/permission/Permission/display/' + code, query: {}});
      },
      deletePermission(code) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonRequestProgressStart("正在删除,请稍后...");
          PermissionService.deletePermission(code).then((res) => {
            this.buttonRequestProgressClose();
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.refresh();
          }).catch((error) => {
            this.buttonRequestProgressClose();
            this.$message({
              type: 'error',
              message: '删除失败，请稍后再试！'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      chageData(){
        this.permissions = []
        let _this = this
        this.allPermissions.forEach(item => {
          if (item.moduleCode == _this.currentModuleCode) {
            _this.permissions.push(item)
          }
        })
        this.totalCount = this.permissions.length;
        let start = (this.currentPage - 1) * this.pageSize
        let end = start + this.pageSize
        this.permissions.slice(start, end)
      },
      changeSize(val) {
        this.pageSize = val;
        this.chageData()
      },
      changePage(val) {
        this.currentPage = val;
        this.chageData()
      },
      addPermission() {
        //新增权限点
        this.$router.push({path: '/simple/permission/permission/add', query: {}});
      },
      editOrganation(permissionCode) {
        //编辑权限点
        this.$router.push({path: '/simple/permission/permission/edit/' + permissionCode, query: {}});
      },
    }
  }
</script>
<style scoped lang="scss">
  .form {
    float: left;
  }

  .search-select {
    float: left;
    margin-right: 2%;
  }
</style>
