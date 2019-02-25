<template>
  <el-form ref="modelform" :model="modelform" label-width="80px" style="overflow: auto;height: 100%;">
    <div class="alert-container clearfix">
      <div class="alert-container clearfix">
        <el-alert v-for="alert in alerts.errors" :key="alert.title"
                  v-bind:title="alert.content"
                  type="error"
                  show-icon>
        </el-alert>
      </div>
    </div>

    <div class="tilteDisplay">
      <h2 class="generatorCode">代码生成</h2>
      <el-row class="generatorOperate">
        <el-form-item label="模型定义">
          <el-input type="textarea" v-model="modelform.modelDefinition" placeholder="请输入模型定义" clearable autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="generateModel">生成模型</el-button>
        </el-form-item>
        <el-form-item label="模型名称">
          <el-input type="textarea" v-model="modelform.className" placeholder="请输入模型名称" clearable autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="generateBaseCode">生成基础代码</el-button>
        </el-form-item>
        <el-form-item label="Controller方法名称">
          <el-input type="input" v-model="modelform.controllerMethodName"
                    placeholder="请输入Controller方法名称，例如：com.cisdi.info.simple.controller.codetable.CodeTableController.updateCodeTable"
                    clearable autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="generateControllerMethod">生成方法代码</el-button>
        </el-form-item>
      </el-row>
    </div>
    <el-form-item>
      <h2 class="createEmp">创建超级用户测试</h2>
      <el-row class="testFileBorder" style="padding-left: 2%;">
        <el-button type="primary" class="createButton" @click="createSuperOperator">创建超级用户</el-button>
        <el-row :body-style="{ padding: '0px' }" style="display: inline-block;">
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button type="primary" class="createButton" @click="testException">异常测试</el-button>
            </div>
          </div>
        </el-row>
      </el-row>
    </el-form-item>
    <el-form-item>
      <h2 class="testFileInterface">测试文件接口</h2>
        <div class="testFileBorder">
        <el-row class="testFileContent">
          <el-col :span="4">
            <el-upload
              action=""
              class="upload-demo"
              :on-change="handleFileChange"
              :file-list="fileLists"
              :auto-upload="false">
              <el-button type="primary" style="padding: 9px 15px !important;">选择文件</el-button>
            </el-upload>
          </el-col>
          <el-col :span="4">
            <el-button  type="primary" style="padding: 9px 15px !important;" @click="submitFile">
              提交文件
            </el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="findAllFile"  type="primary" >获取文件列表</el-button>
          </el-col>
        </el-row>
          <el-row>
            <div v-for=" file in fileArray">
              {{file.attachmentRealName}}<span style="color: blue;cursor: pointer"
                                               @click="down(file.attachmentAddr)">下载</span> <span
              style="color: blue;cursor: pointer" @click="view(file.attachmentAddr)">预览</span><span
              style="color:red;cursor: pointer" @click="deleteFile(file.eid)">删除</span>
            </div>
          </el-row>
        <br>
<!--        <el-row class="testFileContent">
            <el-col :span="4">
              <el-button @click="excelExport" type="primary" class="fileButtonOne">excel导出</el-button>
            </el-col>
            <el-col :span="4">
              <el-upload
              action=""
              :file-list="fileList"
              :on-change="fileChange"
              :limit="1"
              :auto-upload="false">
              <el-button type="primary" class="fileButtonOne">word选择文件</el-button>
            </el-upload>
            <el-button @click="excelImport" type="primary" class="fileButtonOne">excel导入</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="wordExport" type="primary" class="fileButtonOne">word下载</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="wordView" type="primary" class="fileButtonOne">word模板替换预览</el-button>
          </el-col>
          <el-col :span="4">
            <el-button @click="wordDownlaod" type="primary" class="fileButtonOne">word模板替换下载</el-button>
          </el-col>
          <el-col >
            <el-button @click="openFullScreen2" type="primary" class="fileButtonOne">整页服务方式</el-button>
          </el-col>
        </el-row>
            --><!--
        <br>
        <el-row class="testFileContent">
          <el-col :span="4">
            <el-button @click="onlineView" type="primary" style="background: #1f80af;border: 0;">在线预览</el-button>
          </el-col>
        </el-row>-->
        </div>

      <el-row>
        <div v-for=" file in fileArray">
          <img height="200px" width="200" style="text-align: center" :src="headerFile+file.attachmentAddr"/>
        </div>
      </el-row>
    </el-form-item>

    <div class="text item clearfix">
      <el-alert v-for="remark in alerts.remarks" :key="remark.title"
                v-bind:title="remark.title"
                type="info"
                v-bind:description="remark.description">
      </el-alert>
    </div>
  </el-form>


</template>

<script>
  import {version} from '../../../package'
  import {GeneratorService} from './api';
  import {Msg} from '../../tools/message';


  export default {

    name: "generator",
    data() {
      return {
        fileList: [],
        fileLists: [],
        fileArray: [],
        headerFile: process.env.BASE_FILE_VIEW,
        content: "dddd",
        modelform: {
          className: "",
          modelDefinition: "",
          controllerMethodName: "",

        },
        alerts: {
          remarks: [{title: "功能说明", content: "TODO: 请在这里加上功能说明"},],
          successes: [], //TODO:[{title:'消息内容'},]
          infos: [],
          warnings: [],
          errors: [],
        },
      }
    },
    methods: {
      openFullScreen2() {
        this.buttonRequestProgress();
      },
      deleteFile(id) {
        GeneratorService.deleteFileById({attachmentId: id}).then(res => {
          Msg.success("删除成功")
          this.findAllFile();
        })
      },
      excelExport() {
        let o = {
          currentPage:1,
          pageSize:2
        }
        GeneratorService.excelExportTest(o).then(res => {
          // 创建a标签
          let a = document.createElement('a');
          let e = document.createEvent('MouseEvents');
          // 创建鼠标事件对象初始化事件对象
          e.initEvent('click', false, false);
          // 设置下载地址
          a.href = res.request.responseURL;
          // 给指定的元素，执行事件click事件
          a.dispatchEvent(e);
        })
      },
      excelImport() {
        let list = []
        this.fileList.forEach(file => list.push(file.raw))
        GeneratorService.excelImportTest(list).then(res => {
        })
      },
      //预览
      wordView() {
        GeneratorService.wordTemplateTest().then(res => {
          let filename = res.data
          window.open(process.env.BASE_ONLINE_VIEW + process.env.BASE_FILE_API + filename);
        })
      },
      //下载
      wordDownlaod() {
        GeneratorService.wordTemplateTest().then(res => {
          let filename = res.data
          let a = document.createElement('a');
          let e = document.createEvent('MouseEvents');
          e.initEvent('click', false, false);
          a.href = process.env.BASE_FILE_API + filename;
          a.dispatchEvent(e);
        })
      },
      wordExport() {
        GeneratorService.wordExportTest().then(res => {
          // 创建a标签
          let a = document.createElement('a');
          let e = document.createEvent('MouseEvents');
          // 创建鼠标事件对象初始化事件对象
          e.initEvent('click', false, false);
          // 设置下载地址
          a.href = res.request.responseURL;
          // 给指定的元素，执行事件click事件
          a.dispatchEvent(e);
        })
      },
      onlineView() {
        window.open(process.env.BASE_ONLINE_VIEW + "https://www.baidu.com/img/bd_logo1.png");
      },
      downloadFile() {
        window.open("http://localhost:8080/simple/attachment/Attachment/download?fileAddress=/20180823/批量下载VPN等201808231500114378.zip&isOnline=true");
      },
      submitFile() {
        GeneratorService.fileUpload({name: 'xx',associateFormId:'4',associateFormName:'simple_test'}, this.fileLists).then(res => {
          Msg.success("上传成功")
        this.findAllFile();
        })
      },
      handleFileChange(file, fileList) {
        this.fileLists = fileList;
      },
      fileChange(file, fileList) {
        this.fileList = fileList;
      },
      addAlert(message, title, type) {
        //type 可选的值为:remarks,successes,infos,warnings,errors
        type = type ? type : "errors";
        type = this.alerts[type] ? type : "errors";
        title = title ? title : message;
        this.alerts[type].unshift({title: title, content: message});
      },
      removeAlert(title, type) {
        //type 可选的值为:remarks,successes,infos,warnings,errors
        type = type ? type : "errors";
        type = this.alerts[type] ? type : "errors";
        for (var i = this.alerts[type].length - 1; i >= 0; i--) {
          delete this.alerts[type][i]
        }
      },

      view(path) {
        window.open(process.env.BASE_FILE_VIEW + "" + path + '&isOnline=true')
      },
      down(path) {
        window.open(process.env.BASE_FILE_VIEW + "" + path)

      },
      findAllFile() {
        GeneratorService.findAllUploadedFilesByIdAndName({id: '4', name: 'simple_test'}).then(res => {
          Msg.success("获取成功")
          this.fileArray = res.data;
          console.log(res)
        })
      }
     ,

      addAlert(message, title, type) {
        //type 可选的值为:remarks,successes,infos,warnings,errors
        type = type ? type : "errors";
        type = this.alerts[type] ? type : "errors";
        title = title ? title : message;
        this.alerts[type].unshift({title: title, content: message});
      },
      removeAlert(title, type) {
        //type 可选的值为:remarks,successes,infos,warnings,errors
        type = type ? type : "errors";
        type = this.alerts[type] ? type : "errors";
        for (var i = this.alerts[type].length - 1; i >= 0; i--) {
          delete this.alerts[type][i]
        }
      },
      generateModel() {
        var modelform = this.modelform
        this.$refs["modelform"].validate((valid) => {
            if (valid) {
              console.log('submit!');
              GeneratorService.generateModel(modelform.modelDefinition).then((res) => {
                if (res.data.errorMsg !== "") {
                  Msg.error("生成模型出错：" + res.data.errorMsg)
                }
                else {
                  Msg.success('生成模型成功' + res.data.successMsg);
                  if (!this.modelform.className) {
                    this.modelform.className = res.data.successMsg;
                  }
                  else {
                    this.modelform.className += "\n" + this.modelform.className;
                  }

                }
              }).catch(err => {
                Msg.error("生成模型出错：" + err.data.error)
              })
            }
            else {
              return false;
            }

          }
        )
      },
      generateBaseCode() {
        var modelform = this.modelform
        this.$refs["modelform"].validate((valid) => {
            if (valid) {
              console.log('submit!');
              GeneratorService.generateBaseCode(modelform.className).then((res) => {
                if (res.data.errorMsg !== "") {
                  Msg.error("生成基础代码出错：" + res.data.errorMsg)
                }
                else {
                  Msg.success('生成基础代码成功' + res.data.successMsg);

                }
              }).catch(err => {
                Msg.error("生成基础代码出错：" + err.data.message)
              })
            }
            else {
              return false;
            }

          }
        )
      },
      generateControllerMethod() {
        var modelform = this.modelform
        this.$refs["modelform"].validate((valid) => {
            if (valid) {
              GeneratorService.generateMethod(this.modelform.controllerMethodName).then((res) => {
                Msg.success('生成方法成功' + res.data);
              }).catch(err => {
                Msg.error("生成方法出错：" + err)
              })
            }
            else {
              return false;
            }

          }
        )
      },
      createSuperOperator() {
        var modelform = this.modelform
        this.$refs["modelform"].validate((valid) => {
            if (valid) {
              GeneratorService.createSuperOperator().then((res) => {
                Msg.success('创建超级用户成功' + res.data);
              }).catch(err => {
                Msg.error("创建超级用户出错：" + err)
              })
            }
            else {
              return false;
            }

          }
        )
      },
      testException() {
        this.buttonRequestProgressStart("正在保存,请稍后...");
         GeneratorService.testException().then((res) => {
           this.buttonRequestProgressClose();
          Msg.success('成功' + res.data);
        }).catch((error) => {
          console.log(error)
          //error的data属性是后台传入的数据,data的extendedData存有后台传入的数据
          this.isSubmiting = false;
          if (error.status === 590) {
            //error.data.extendedData 是扩展数据，可以使用
            //this.alerts.errors.unshift({title:error.data.message})
            this.addAlert(error.data.message)
          }
          else {
            this.alerts.errors.unshift({title: error.data.message})
            this.$message({
              type: 'error',
              message: '删除失败，,原因是：' + error.data.message
            })
          }

        });

      }
    },
  }
</script>

<style scoped>

.testUploadFile{
  border: 1px solid #ded9d9;
  margin-left: -4%;
  padding: 1% 0 1% 4%;
}
.generatorCode{
  text-align: center;
  height: 30px;
  margin-top: 2vh;
  color: dodgerblue;
}
.testFileInterface{
  text-align: center;
  color: dodgerblue;
  margin-left: -4%;
}
.generatorOperate{
  border: 1px dashed #ded9d9;
  margin-left: 2vw;
  padding-top: 1%;
}
.createEmp{
  text-align: center;
  margin-left: -6%;
  color: #4783c1;
  margin-top: 3vh;
}
.testFileBorder{
  border: 1px dashed #ded9d9;
  margin-left: -2%;
  padding-top: 1%;
  padding-bottom: 1%;
}
.testFileContent{
  margin-left: 2%;
}
.fileButtonOne{
  background: #048bccc4;
  border: 0;
}
.distribButton{
  background: #35a3d899;
  border: 0;
}
.createButton{
  background: #4783c1;
  border: 0;
}
</style>
