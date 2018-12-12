<template>
<div class="xx_file_tip_1021" style="display: inline;
    position: absolute;
    right: -25px;">
  <el-tooltip  transition="el-fade-in-linear" :content="inputTip" placement="bottom" effect="dark">
    <i @click="change" class="el-icon-info" style="font-size: 17px;"></i>
  </el-tooltip>
  <el-dialog  v-drag-dialog :visible.sync="iconDisplay" close-on-click-modal @before-close="closeDia" >
      {{inputTip}}
    <template slot="title">提示内容</template>
  </el-dialog>
</div>
</template>
<script>
export default {
  props:['content'],
 data(){
   return{
     iconDisplay:false
   }
 },
  created(){
  },
  computed:{
     inputTip(){
       if(this.content==""||this.content==undefined||this.content==null){
         return "暂无提示内容";
       }
     return this.content;
    }
  },
  methods:{
   change(){
     this.iconDisplay=true
   },
    closeDia(){
     this.iconDisplay=false
    }
  }
}
</script>
<style>
.xx_file_tip_1021 .el-dialog__body{
  text-indent:2em;
  padding: 8px 20px;
  padding-bottom: 20px;
}
.xx_file_tip_1021 .el-dialog__header {
  padding: 11px 20px;
  padding-bottom: 6px;
  color: green;
}
.xx_file_tip_1021 .el-icon-close:before {
  content: "\E60F";
  color: red;
}
.xx_file_tip_1021 .el-icon-info:before {
  content: "\E61A";
  color: #67c23a;
}
</style>
