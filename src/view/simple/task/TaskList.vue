
<template>
  <div class="span-control-list" style="width: 100%;margin-left: 0!important;">
    <el-card class="box-card set-organ" style="margin: 0px; width: 100%; min-height: 99%">
      <div slot="header" class="clearfix">
        <span>定时任务管理</span>
      </div>
      <el-row>
        <div class="alert-container clearfix">
          <el-alert  v-for="alert in alerts.successes"  :key="alert.title"
                     v-bind:title="alert.title"
                     type="success"
                     show-icon>
          </el-alert>
          <el-alert  v-for="alert in alerts.infos"  :key="alert.title"
                     v-bind:title="alert.title"
                     type="info"
                     show-icon >
          </el-alert>
          <el-alert  v-for="alert in alerts.warnings"  :key="alert.title"
                     v-bind:title="alert.title"
                     type="warning"
                     show-icon >
          </el-alert>
          <el-alert  v-for="alert in alerts.errors"  :key="alert.title"
                     v-bind:title="alert.title"
                     type="error"
                     show-icon >
          </el-alert>
        </div>
      </el-row>
      <el-row>
        <!--数据表格-->
        <el-col>
          <!--新增任务按钮-->
          <down-search :selectValues="selectValues" @returnedValue="searchByCondition"></down-search>
          <div style="float: right; margin-bottom: 15px">

            <el-button  type="primary" @click="addTask()"  v-permission:simple_task_Task_Add >新增定时任务</el-button>
          </div>
          <div class="table-control">
            <el-table v-loading="tableLoading" size="small" class="table-style" :data="tasks" border highlight-current-row @current-change="handleCurrentChange">
              <el-table-column type="expand" fixed="left">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="list-table-expand">
                    <el-form-item label="标识">
                      <span>{{ props.row.EId }}</span>
                    </el-form-item>
                    <el-form-item label="名称">
                      <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="任务编码">
                      <span>{{ props.row.taskId }}</span>
                    </el-form-item>
                    <el-form-item label="表达式">
                      <span>{{ props.row.taskExpression }}</span>
                    </el-form-item>
                    <el-form-item label="发布人">
                      <span>{{ props.row.taskPublisher }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <span>{{ props.row.taskCreateTime  | dateFormat}}</span>
                    </el-form-item>
                    <el-form-item label="完成时间">
                      <span>{{ props.row.taskCompleteTime | dateFormat}}</span>
                    </el-form-item>
                    <el-form-item label="任务状态">
                      <span>{{ props.row.taskStatus }}</span>
                    </el-form-item>
                    <el-form-item label="执行任务类">
                      <span>{{ props.row.taskClass }}</span>
                    </el-form-item>
                    <el-form-item label="执行任务变量">
                      <span>{{ props.row.taskVariable }}</span>
                    </el-form-item>
                    <el-form-item label="任务配置ID">
                      <span>{{ props.row.taskConfigId }}</span>
                    </el-form-item>
                    <el-form-item label="任务组">
                      <span>{{ props.row.taskGroup }}</span>
                    </el-form-item>
                    <el-form-item label="任务名称">
                      <span>{{ props.row.taskName }}</span>
                    </el-form-item>
                    <el-form-item label="备注">
                      <span>{{ props.row.remark }}</span>
                    </el-form-item>
                    <el-form-item label="创建人">
                      <span>{{ props.row.createId }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <span>{{ props.row.createDatetime | dateFormat}}</span>
                    </el-form-item>
                    <el-form-item label="修改人">
                      <span>{{ props.row.updateId }}</span>
                    </el-form-item>
                    <el-form-item label="修改时间">
                      <span>{{ props.row.updateDatetime  | dateFormat}}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <!--<el-table-column show-overflow-tooltip align="left" prop="name" label="定时任务名称" min-width="100" fixed="left" sortable resizable show-overflow-tooltip>-->
              <!--<template slot-scope="scope">-->
              <!--<p v-on:click="displayTask(tasks[scope.$index].eid)"-->
              <!--style="text-decoration: underline">-->
              <!--{{ tasks[scope.$index].name }}-->
              <!--</p>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column align="left" clalss="setCenter" prop="taskName" label="任务名称" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="taskExpression" label="表达式" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="taskPublisher" label="发布人" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" label="创建时间" min-width="80" sortable resizable show-overflow-tooltip>
                <template  slot-scope="scope">
                  <div>
                    {{scope.row.taskCreateTime | dateFormat}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="taskCompleteTime" label="完成时间" min-width="80" sortable resizable show-overflow-tooltip>
                <template  slot-scope="scope">
                  <div>
                    {{scope.row.taskCompleteTime | dateFormat}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter"  label="任务状态" min-width="80" sortable resizable show-overflow-tooltip>
                <template  slot-scope="scope">
                  <div v-if="scope.row.taskStatus === '已激活'||scope.row.taskStatus === '已结束'" style="color: green;">
                    {{scope.row.taskStatus}}
                  </div>
                  <div v-if="scope.row.taskStatus === '未激活'||scope.row.taskStatus === '已暂停'" style="color: red;">
                    {{scope.row.taskStatus}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="taskClass" label="执行任务类" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="taskVariable" label="执行任务变量" min-width="100" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column align="left" clalss="setCenter"  label="任务组" min-width="80" sortable resizable show-overflow-tooltip>
                <!--prop="taskGroup"-->
                <template  slot-scope="scope">
                  <div v-if="scope.row.taskGroup === 'ddd4'" >
                    默认任务组
                  </div>
                  <div v-else >
                    项目任务组
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="left" clalss="setCenter" prop="remark" label="备注" min-width="80" sortable resizable show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" min-width="120" resizable align="center">
                <template slot-scope="scope">
                  <template>
                    <el-button @click="startTask(tasks[scope.$index].eid)" type="text" size="small" v-if="tasks[scope.$index].taskStatus === '未激活'" >
                      启动
                    </el-button>
                  </template>
                  <template>
                    <el-button @click="pauseTask(tasks[scope.$index].eid)" type="text" size="small"  v-if="tasks[scope.$index].taskStatus === '已激活'">暂停</el-button>
                  </template>
                  <template>
                    <el-button @click="resumeTask(tasks[scope.$index].eid)" type="text" size="small"  v-if="tasks[scope.$index].taskStatus === '已暂停'">恢复</el-button>
                  </template>
                  <template>
                    <el-button @click="deleteJob(tasks[scope.$index].eid)" type="text" size="small"  v-if="tasks[scope.$index].taskStatus === '已激活'">停止</el-button>
                  </template>
                  <template>
                    <el-button @click="editOrganation(tasks[scope.$index].eid)" type="text" size="small" v-permission:simple_task_Task_Edit  v-if="tasks[scope.$index].taskStatus === '未激活'">编辑</el-button>
                  </template>
                  <template>
                    <el-button @click="deleteTask(tasks[scope.$index].eid)" type="text" size="small" v-permission:simple_task_Task_Delete v-if="tasks[scope.$index].taskStatus === '已结束'"><p
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
  import {TaskService} from './TaskService';
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
        tasks: [],
        tableLoading: false,
        alerts:{ remarks:[{title:"功能说明",content:"TODO: 请在这里加上功能说明"},],
          successes:[], //TODO:[{title:'消息内容'},]
          infos:[],
          warnings:[],
          errors:[]},
        selectValues:[
          {key:"taskExpression",value:"表达式"},
          {key:"taskPublisher",value:"发布人"},
          {key:"taskCreateTime",value:"创建时间"},
          {key:"taskCompleteTime",value:"完成时间"},
          {key:"taskStatus",value:"任务状态"},
          {key:"taskClass",value:"执行任务类"},
          {key:"taskVariable",value:"执行任务变量"},
          {key:"taskGroup",value:"任务组"},
          {key:"taskName",value:"任务名称"},
          {key:"remark",value:"备注"},
        ],
        condition:''

      }
    },
    created: function () {
      this.findTasks();
    },
    methods: {
      searchByCondition(value){
        this.condition=value;
        this.findTasks();
      },
      addAlert(message,title,type){
        //type 可选的值为:remarks,successes,infos,warnings,errors
        type = type? type:"errors";
        type = this.alerts[type]?type:"errors";
        title = title?title:message;
        this.alerts[type].unshift({title:title,content:message});
      },
      removeAlert(title,type){
        //type 可选的值为:remarks,successes,infos,warnings,errors
        type = type? type:"errors";
        type = this.alerts[type]?type:"errors";
        for (var i = this.alerts[type].length-1; i>=0 ; i--) {
          delete this.alerts[type][i]
        }
      },
      refresh() {
        this.findTasks();
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
      findTasks() {
        var parms = this.installParms();
        this.buttonRequestProgressStart("正在搜索,请稍后...");
        TaskService.findTasks(parms).then((res) => {
          this.buttonRequestProgressClose();
          this.tasks = res.data.datas;
          this.totalCount = res.data.totalCount;
        }).catch((error) => {
          this.buttonRequestProgressClose();
          this.$message({
            type: 'error',
            message: '网络繁忙，请稍候再试！'
          })
        })
      },
      displayTask(taskId){
        var router = this.$router;
        router.push({path: '/simple/task/task/display/'+taskId, query: {}});
      },
      deleteTask(taskId) {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonRequestProgressStart("正在删除,请稍后...");
          TaskService.deleteTask(taskId).then((res) =>{
            this.buttonRequestProgressClose();
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.refresh();
          }).catch((error) => {
            this.buttonRequestProgressClose();
            //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
            this.isSubmiting = false;
            this.addAlert({title:error.data.message})
            this.$message({
              type: 'error',
              message: '删除失败，,原因是：'+error.data.message
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
        this.findTasks();
      },
      changePage(val) {
        this.currentPage = val;
        this.findTasks();
      },
      addTask(){
        //新增定时任务
        var router = this.$router;
        router.push({path: '/simple/task/task/add', query: {}});
      },
      editOrganation(taskId){
        //编辑定时任务
        var router = this.$router;
        router.push({path: '/simple/task/task/edit/'+taskId, query: {}});
      },
      handleCurrentChange(currentRow,oldCurrentRow) {
        //this.currentRow = val;
      },
      startTask(id) {
        this.$confirm('此操作将开启id为'+id+'的定时任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          TaskService.startTask(id).then((res) => {
            this.findTasks();
            this.$message({
              type: 'success',
              message: '开启成功!'
            });
          }).catch((err) => {
            Msg.success(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

      },
      pauseTask(id) {
        this.$confirm('此操作将暂停当前定时任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          TaskService.pauseTask(id).then((res) => {
            this.findTasks();
            this.$message({
              type: 'success',
              message: '暂停成功!'
            });
          }).catch((err) => {
            Msg.success(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      resumeTask(id) {
        this.$confirm('此操作将恢复当前定时任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          TaskService.resumeTask(id).then((res) => {
            this.findTasks();
            this.$message({
              type: 'success',
              message: '恢复成功!'
            });
          }).catch((err) => {
            Msg.success(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      deleteJob(id) {
        this.$confirm('此操作将终止当前定时任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          TaskService.deleteJob(id).then((res) => {
            this.findTasks();
            this.$message({
              type: 'success',
              message: '终止成功!'
            });
          }).catch((err) => {
            Msg.success(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
    }
  }
</script>
<style scoped lang="scss">
</style>
