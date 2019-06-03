<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>模块管理</span>
      </div>
      <el-row>
        <!--数据表格-->
        <el-col>
          <!--新增任务按钮-->
          <div style="float: right; margin-bottom: 15px">
            <el-button type="primary" @click="addModule()" v-permission:simple_permission_Module_Add>新增模块</el-button>
          </div>
          <div class="table-control">
            <el-table v-loading="tableLoading" size="small" class="table-style" :data="modules" row-key="code" border :expand-row-keys="['simple']">
              <el-table-column show-overflow-tooltip align="left" prop="name" label="模块名称" min-width="180" fixed="left"
                               resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" class="setCenter" prop="code" label="模块编码" min-width="80" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="left" class="setCenter" prop="route" label="页面路由" min-width="80" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" class="setCenter" prop="iconClass" label="图标" min-width="60" resizable
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <i :class="scope.row.iconClass"></i>
                </template>
              </el-table-column>
              <el-table-column align="center" class="setCenter" prop="displayIndex" label="显示顺序" min-width="60"
                               resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" class="setCenter" prop="parentName" label="上级模块" min-width="80" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" class="setCenter" prop="moduleType" label="模块类型" min-width="80" resizable
                               show-overflow-tooltip></el-table-column>
              <el-table-column align="center" class="setCenter" prop="isInUse" label="使用状态" min-width="60" resizable
                               show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.isInUse=='在用'" size="success">{{ scope.row.isInUse }}</el-tag>
                  <el-tag v-if="scope.row.isInUse=='停用'" size="danger">{{ scope.row.isInUse }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" min-width="100" resizable>
                <template slot-scope="scope">
                  <!--<template>-->
                    <!--<el-button @click="displayModule(scope.row.code)" type="text" size="small"-->
                               <!--v-permission:simple_permission_Module_View>查看-->
                    <!--</el-button>-->
                  <!--</template>-->
                  <template>
                    <el-button @click="editOrganation(scope.row.code)" type="text" size="small"
                               v-permission:simple_permission_Module_Edit>编辑
                    </el-button>
                  </template>
                  <template>
                    <el-button @click="deleteModule(scope.row.code)" type="text" size="small"
                               v-permission:simple_permission_Module_Delete><p
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
  import {ModuleService} from './ModuleService';
  import downSearch from '@/components/select/downSearch'

  export default {
    components: {downSearch},
    data() {
      return {
        rules: {},
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        modules: [],
        tableLoading: false,
        value: '',
        search: '',
        selectValues: [
          {key: "name", value: "模块名称"},
          {key: "code", value: "模块编码"},
          {key: "route", value: "页面路由"},
          {key: "parentName", value: "上级模块"},
          {key: "moduleType", value: "模块类型"},
          {key: "isInUse", value: "使用状态"}
        ],
        condition: ''
      }
    },
    created: function () {
      this.findModules();
    },
    methods: {
      searchByCondition(value) {
        this.currentPage = 1;
        this.condition = value;
        this.findModules();
      },
      refresh() {
        this.findModules();
      },
      installParms() {
        var parms = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          columnName: this.condition.columnName,
          content: this.condition.content
        }

        return parms;
      },
      findModules() {
        var parms = this.installParms();
        this.buttonRequestProgressStart("正在搜索,请稍后...");
        ModuleService.findModuleTree(parms).then((res) => {
          this.buttonRequestProgressClose();
          this.modules = res.data.datas;
          this.totalCount = res.data.totalCount;
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      displayModule(moduleId) {
        this.$router.push({path: '/simple/permission/module/display', query: {moduleCode: moduleId}});
      },
      deleteModule(moduleId) {
        this.$confirm('此操作会删除该模块以及该模块下的所有子模块，您确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonRequestProgressStart("正在删除,请稍后...");
          ModuleService.deleteModule(moduleId).then((res) => {
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
              message: error.data.message
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      changeSize(val) {
        this.pageSize = val;
        this.findModules();
      },
      changePage(val) {
        this.currentPage = val;
        this.findModules();
      },
      //新增模块
      addModule() {
        this.$router.push({path: '/simple/permission/module/add', query: {}});
      },
      //编辑模块
      editOrganation(moduleId) {
        this.$router.push({path: '/simple/permission/module/edit', query: {moduleId: moduleId}});
      },
      handleCurrentChange(currentRow, oldCurrentRow) {
        //this.currentRow = val;
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
