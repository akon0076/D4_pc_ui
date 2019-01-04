<template>
  <div class="boxShadow">
    <div class="operate" style="height:5vh">
      <el-button size="mini" class="del-com" @click="exportTable('example',tableDatas,borderStyle)">导出</el-button>
    </div>
    <div style="width:100%;height:100%;overflow:auto">
      <el-table id="tableKey"
        :data="tables"
        tooltip-effect="dark"
        style="width: 100%" :height="heightCustom || '95vh'">
        <template v-if="isHavaData">
          <!-- <el-table-column  type="selection" width="45px"></el-table-column> -->
          <el-table-column  label="序号" width="62px" type="index"></el-table-column>
        </template>

        <template v-if="isHavaData" v-for='(col) in tableDatas'>
          <el-table-column
            sortable
            :show-overflow-tooltip="true"
            :prop="col.name"
            :label="col.label"
            :key="col.label"
            :width="col.width">
          </el-table-column>
        </template>
        <template v-else>
          <div>暂无配置</div>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
//const XLSX = require("xlsx");
//import a form "xlsx";
//import FileSaver from "file-saver";
//const xlsxStyle =require("xlsx-style");
import { Transform } from 'stream';
import { d4utils } from '../../tools/d4utils';

//console.log(downloadData('ddd'));
  export default {
    name: "test",
    data() {
      return {
        tables: [],
        tableDatas: [],
        isHavaData: false
      }
    },

    props:{
      tableData:Array,
      table: Array,
      heightCustom: String
    },
    updated(){
      this.renderTable();
    },
    watch: {
      table(val) {
        if(val){
          this.isHavaData = true;
          this.tables = val;
        }
      },
      tableData(value){
        let tableTitle = this.crossTableDefTransfer(value);
        this.tableDatas = tableTitle;
      }
    },
    methods: {
      //将获取数据进行主键、行数据、列数据排序
      crossTableDefTransfer(data){
        let tempKey = [];
        let tempRowField = [];
        let tempCorssField = [];
        for(let i = 0;i < data.length;i++){
          if(data[i].type == "crossKey"){
            tempKey.push(data[i]);
          }
          if(data[i].type == "rawField"){
            tempRowField.push(data[i]);
          }
          if(data[i].type == "crossField"){
            tempCorssField.push(data[i]);
          }
        }
        let dataArr = tempKey.concat(tempRowField).concat(tempCorssField);
        return dataArr;
      },

      //todo: 对导出的列宽进行设置
      //参数：orderNumber:序号的宽度设置，maxCol：最大列（A-Z）
      // setCols(sheet,orderNumber,maxCol){
      //   let cols = []; 
      // //  let tempOrderNumber = orderNumber.toString();
      //   let temp = {};
      //   let count = 0;
      //   let tempWidth = 0;
      //   for(let key in sheet){
      //     if((/[A-Z]/.test((key.charAt(0))))){
      //       if((key.charAt(0)) == 'A'){
      //         temp = {wpx:orderNumber};
      //         cols.push(temp);
      //       }
      //       else if((key.charAt(0)) == maxCol){
      //         if(this.tableDatas[count] && this.tableDatas[count].width){
      //           tempWidth = parseInt(this.tableDatas[count].width);
      //           temp = {wpx:tempWidth};
      //           cols.push(temp);
      //         }
      //         break;
      //       }
      //       else{
      //         if(this.tableDatas[count] && this.tableDatas[count].width){
      //           tempWidth = parseInt(this.tableDatas[count].width);
      //           temp = {wpx:tempWidth}
      //           cols.push(temp);
      //         }
      //       }
      //     }
      //   count++;
      //   }
      //   return cols;
      // },
      
      // // todo：excel导出
      // // 参数：orderNumber：序号的宽度
      // downloadData(fileName){
      //   let wb = XLSX.utils.table_to_book(document.querySelector("#tableKey"));
      //   let wbSheet = wb.Sheets.Sheet1;
      //   //todo 获取列的最大值（A-Z）
      //   let ascCol = ((wbSheet["!ref"].split(":")[1].charAt(0)).charCodeAt() - 1);
      //   let maxCol = String.fromCharCode(ascCol);
      //   wbSheet['!cols'] = this.setCols(wbSheet,100,maxCol);;
      //   let count = 0;
      //   for(let key in wb.Sheets.Sheet1){
      //     if((/[B-Z]/.test((key.charAt(0))))){
      //       if((key.charAt(0)) == maxCol){
      //         if(this.tableDatas[count] && this.tableDatas[count].color){
      //           wb.Sheets.Sheet1[key].s = {
      //             fill:{
      //               fgColor:{
      //                 rgb: this.tableDatas[count].color.split('#')[1]
      //               }
      //             }
      //           }
      //         }
      //         count = 0;
      //       }else{
      //         if(((key.charAt(0)).charCodeAt()) <= ascCol){
      //           if(this.tableDatas[count] && this.tableDatas[count].color){
      //             wb.Sheets.Sheet1[key].s = {
      //               fill:{
      //                 fgColor: {
      //                   rgb: this.tableDatas[count].color.split('#')[1]
      //                 }
      //               }
      //             }
      //           }
      //           count++;
      //         }
      //       }
      //     }
          
      //   }
      //   let wbout = xlsxStyle.write(wb, {
      //     bookType: 'xlsx',
      //     bookSST: true, 
      //     type: 'buffer' 
      //   });
      //   try{
      //     FileSaver.saveAs(new Blob([wbout],{type : 'application/octet-stream;charset=utf-8' }), fileName + ".xlsx");
      //   }catch(e){
      //     console.log(e,wb);
      //   }
      //   return wb;
      // },

      //todo: 渲染表格颜色
      renderTable(){
        let count = 0;
        let trs = document.getElementsByTagName("tr");
        let tds = trs[0].childNodes;
        for(let i = 0;i < tds.length;i++){
          count ++;
          for(let j = 0;j < trs.length;j++){
            if(this.tableDatas[i] && this.tableDatas[i].color) {
              trs[j].childNodes[count].style.background = this.tableDatas[i].color;
            }
          }
        }
      },
      exportTable(fileName,arr){
        d4utils.downloadData(fileName,arr);
      }
    }
  }
</script>

<style scope

</style>
