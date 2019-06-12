<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!--任务名称-->
      <el-row>
        <el-col :span="16">
          <div>
            <el-form-item label="任务名称" prop="taskName">
              <el-input v-model="ruleForm.taskName"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!--任务类型，任务时间-->
      <el-row>
        <el-col :span="8">
          <div>
            <el-form-item label="任务类型" prop="taskConfigId" >
              <el-select v-model="ruleForm.taskConfigId" placeholder="请选择任务类型" class="task-form-width">
                <el-option v-for="taskConfig in taskConfigs" :label="taskConfig.task_name" :value="taskConfig.id" :key="taskConfig.id"></el-option>
                <!--<el-option label="notice" value="1"></el-option>-->
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="任务时间" prop="taskCreateTime" >
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.taskCreateTime" class="task-form-width"></el-date-picker>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <!--任务类，执行参数-->
      <el-row>
        <el-col :span="8">
          <div>
            <el-form-item label="任务类" prop="taskClass">
              <el-input v-model="ruleForm.taskClass"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="执行参数" prop="taskVariable">
              <el-input v-model="ruleForm.taskVariable"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <!--发布人，表达式-->
      <el-row>
        <el-col :span="8">
          <div>
            <el-form-item label="发布人" prop="taskPublisher">
              <el-input v-model="ruleForm.taskPublisher"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="表达式" prop="taskExpression">
              <el-input v-model="ruleForm.taskExpression"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <!--任务组-->


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="16">
      </el-col>
    </el-row>

  </div>
</template>
<script>
  import {TaskServer} from "./TaskServer";
  import {Msg} from "../../tools/message";

  export default {
    name: "form",
    data() {
      return {
        ruleForm: {},
        rules: {
          taskName: [
            { required: true, message: '请输入任务名称', trigger: 'blur' }
          ],
          taskConfigId: [
            { required: true, message: '请输入任务类型', trigger: 'change' }
          ],
          taskCreateTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          taskClass: [
            { required: true, message: '请输入任务类', trigger: 'blur' }
          ],
          taskVariable: [
            { required: false, message: '请输入执行参数', trigger: 'blur' }
          ],
          taskPublisher: [
            { required: true, message: '请输入发布人', trigger: 'blur' }
          ],
          taskExpression: [
            { required: true, message: '请输入表达式', trigger: 'blur' }
          ],
          // taskGroup: [
          //   { required: true, message: '请输入任务组', trigger: 'blur' }
          // ]
        },
        alerts:{ remarks:[{title:"注意",description:"1.任务名称为必填项 " +
            " 2.发布人为必填项目" +
            " 3.任务类为必填项目，注意必须要写类全名，形如org.app.assistance.controller.TestController " +
            " 4.任务组和任务类型名称可以是一致的" +
            " 5.执行参数需要用json格式描述"},],
          successes:[],
          infos:[],
          warnings:[],
          errors:[]},
        taskConfigs:[]
      };
    },
    methods: {
      submitForm(formName) {
        this.ruleForm.
        this.$refs[formName].validate((valid) => {
          if (valid) {
            TaskServer.addSchedulerJob(this.ruleForm).then((res) => {
              Msg.success("新增成功");
              this.$router.push({path: "/tableList"});
            }).catch((err) => {
              Msg.success(err);
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getTaskConfigList() {
        TaskServer.getTaskConfigList().then((res) => {
          this.taskConfigs = res.data.data
        }).catch((err) => {
          Msg.error(err);
        });
      }
    },
    created() {
      this.getTaskConfigList();
    }
  }
</script>
<style scoped>
  .task-form-width {
    width: 100%;
  }
</style>
