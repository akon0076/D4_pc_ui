<template>
  <div>
    <div class="task-header-btn">
      <el-button @click="addTask">新增任务</el-button>
      <el-button @click="addTask">新增配置</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="quarzName"
        align="center"
        width="180"
        label="任务名称">
      </el-table-column>
      <el-table-column
        prop="task_type"
        label="任务类型"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        width="180">
        <template  slot-scope="scope">
          <div>
            <!--prop="task_create_time"-->
            {{scope.row.task_create_time | dateFormat}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="task_status"
        align="center"
        label="任务状态">
        <template  slot-scope="scope">
          <div v-if="scope.row.task_status === '已激活'||scope.row.task_status === '已结束'" style="color: green;">
            {{scope.row.task_status}}
          </div>
          <div v-if="scope.row.task_status === '未激活'||scope.row.task_status === '已暂停'" style="color: red;">
            {{scope.row.task_status}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="schedulerClass"
        label="任务类"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="task_variable"
        label="执行参数"
        align="center"
        width="130">
      </el-table-column>
      <el-table-column
        prop="task_publisher"
        label="发布人">
      </el-table-column>
      <el-table-column
        prop="cron"
        label="表达式"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="quarzGroup"
        label="任务组"
        align="center"
        width="130">
        <template  slot-scope="scope">
          <div v-if="scope.row.quarzGroup === 'ddd4'" >
            默认任务组
          </div>
          <div v-else >
            项目任务组
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <template>
            <el-button @click="startTask(tableData[scope.$index].id)" type="text" size="small" v-if="tableData[scope.$index].task_status === '未激活'">启动</el-button>
          </template>
          <template>
            <el-button @click="pauseTask(tableData[scope.$index].id)" type="text" size="small"  v-if="tableData[scope.$index].task_status === '已激活'">暂停</el-button>
          </template>
          <template>
            <el-button @click="resumeTask(tableData[scope.$index].id)" type="text" size="small"  v-if="tableData[scope.$index].task_status === '已暂停'">恢复</el-button>
          </template>
          <template>
            <el-button @click="deleteJob(tableData[scope.$index].id)" type="text" size="small"  v-if="tableData[scope.$index].task_status === '已激活'">停止</el-button>
          </template>
          <template>
            <el-button @click="deleteJobInfo(tableData[scope.$index].eid)" type="text" size="small" v-if="tableData[scope.$index].task_status === '已结束'"><p
              style="color: red !important;">删除</p></el-button>
          </template>
          <template>
            <el-button @click="editJob(tableData[scope.$index].id)" type="text" size="small"
                       v-if="tableData[scope.$index].task_status === '未激活'|| tableData[scope.$index].task_status === '已暂停'">编辑</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {TaskServer} from "./TaskServer";
  import {Msg} from "../../tools/message";

  export default {
    name: "table",
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      getTaskList() {
        TaskServer.findTaskList(1).then((res) => {
          this.tableData = res.data.data
        }).catch((err) => {

        });
      },
      addTask() {
        this.$router.push({path: "/form"});
      },
      startTask(id) {
        this.$confirm('此操作将开启id为'+id+'的定时任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          TaskServer.startTask(id).then((res) => {
            this.getTaskList();
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
          TaskServer.pauseTask(id).then((res) => {
            this.getTaskList();
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
          TaskServer.resumeTask(id).then((res) => {
            this.getTaskList();
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
          TaskServer.deleteJob(id).then((res) => {
            this.getTaskList();
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
      deleteJobInfo(id){
        this.$confirm('此操作将删除当前定时任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          TaskServer.deleteJobInfo(id).then((res) => {
            this.getTaskList();
            this.$message({
              type: 'success',
              message: '删除成功!'
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
      }
    },
    created() {
      this.getTaskList();
    }
  }
</script>

<style scoped>
.task-header-btn {
  margin-bottom: 1%;
}
</style>
