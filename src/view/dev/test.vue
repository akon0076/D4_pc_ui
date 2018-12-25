<template>
<div class="ddd">
  <crossTable :table="tables" :table-data="tableData" :height-custom="heightCus"></crossTable>
</div>
  
</template>

<script>

  import crossTable from '../../components/crossTable'
  import {GeneratorService} from "./api";

  export default {
    name: "test",
    data() {
      return {
        tables: [1,2,3],
        tableData: [2,3,4],
        heightCus:''
      }
    },
    components:{
      crossTable
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        GeneratorService.getCrossTableTest().then( (res) => {
          console.log(res.data)
          this.tables = res.data.data;
          this.tableData = res.data.crossTableConfig.crossFieldDefs;
        //  this.tables = "";
       //   this.tableData = "";
        }).catch((err) => {

        });
      }
    }
  }
</script>

<style scoped>

</style>
