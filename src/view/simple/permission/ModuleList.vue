
<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>模块管理</span>
      </div>

      <el-row>
        <!--数据表格-->
        <el-col>
<down-search  :selectValues="selectValues"  @returnedValue="searchByCondition"></down-search>
          <!--新增任务按钮-->
          <div style="float: right; margin-bottom: 15px">
            <el-button  type="primary" @click="addModule()"  v-permission:simple_permission_Module_Add >新增模块</el-button>
          </div>
          <div class="table-control">
            <el-table v-loading="tableLoading" size="small" class="table-style" :data="modules" border highlight-current-row @current-change="handleCurrentChange">
              <el-table-column show-overflow-tooltip align="left" prop="name" label="模块名称" min-width="100" fixed="left"  resizable show-overflow-tooltip>
                <template slot-scope="scope">
                  <p v-on:click="displayModule(modules[scope.$index].code)"
                     style="text-decoration: underline">
                    {{ modules[scope.$index].name }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="code" label="编码" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="url" label="URL地址" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="route" label="路由" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="iconClass" label="图标" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="displayIndex" label="显示顺序" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="parentName" label="上级模块" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="moduleType" label="模块类型" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="parentCode" label="上级模块编码" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="isInUse" label="在用" min-width="80"  resizable show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" min-width="120" resizable>
                <template slot-scope="scope">
                  <template>
                    <el-button @click="editOrganation(modules[scope.$index].code)" type="text" size="small" v-permission:simple_permission_Module_Edit >编辑</el-button>
                  </template>
                  <template>
                    <el-button @click="deleteModule(modules[scope.$index].code)" type="text" size="small" v-permission:simple_permission_Module_Delete ><p
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
        hightlight: true,
        modules: [],
        tableLoading: false,
        value: '',
        search: '',
        selectValues:[
          {key:"name",value:"模块名称"},
          {key:"code",value:"编码"},
          {key:"url",value:"URL地址"},
          {key:"route",value:"路由"},
          {key:"iconClass",value:"图标"},
          {key:"displayIndex",value:"显示顺序"},
          {key:"parentName",value:"上级模块"},
          {key:"moduleType",value:"模块类型"},
          {key:"parentCode",value:"上级模块编码"},
          {key:"isInUse",value:"在用"},
          {key:"remark",value:"备注"},


        ],
        condition:''
      }
    },
    created: function () {
      this.findModules();
    },
    methods: {
      searchByCondition(value){
        this.currentPage=1;
        this.condition=value;
        this.findModules();
      },
      refresh() {
        this.findModules();
      },
      installParms() {
        var parms = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          columnName:this.condition.columnName,
          content:this.condition.content
        }

        return parms;
      },
      findModules() {
        var parms = this.installParms();
        this.buttonRequestProgressStart("正在搜索,请稍后...");
        ModuleService.findModules(parms).then((res) => {
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
      displayModule(moduleId){
        var router = this.$router;
        router.push({path: '/simple/permission/module/display', query: {moduleCode:moduleId}});
      },
      deleteModule(moduleId) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonRequestProgressStart("正在删除,请稍后...");
          ModuleService.deleteModule(moduleId).then((res) =>{
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
      addModule(){
        //新增模块
        var router = this.$router;
        router.push({path: '/simple/permission/module/add', query: {}});
      },
      editOrganation(moduleId){
        //编辑模块
        var router = this.$router;
        router.push({path: '/simple/permission/module/edit', query: {moduleId:moduleId}});
      },
      handleCurrentChange(currentRow,oldCurrentRow) {
        //this.currentRow = val;
      },
    }
  }
</script>
<style scoped lang="scss">
  .form {
    float: left;
  }
  .search-select{
    float: left;
    margin-right: 2%;
  }
</style>
