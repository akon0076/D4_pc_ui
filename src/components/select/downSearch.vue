<template>
  <div style="display:inline">
    <el-input @keyup.enter.native="searchByCondition" clearable
              @clear="searchByCondition"
              v-model="content"
              class="select-input-value"
              :placeholder="placeholder||selectedValuevalue">

      <el-select v-model="selectedValuekey"
                 class="select-input-down"
                 placeholder="请选择查询列"
                 clearable
                 slot="prepend">
        <el-option
          v-for="item in selectValues"
          :key="item.key"
          :label="item.value"
          :value="item.key">
        </el-option>
      </el-select>

      <el-button
        icon="el-icon-search"
        @click="searchByCondition"
        slot="append">
      </el-button>

    </el-input>
  </div>
</template>
<script>
  export default {
    props: ["placeholder","table"],
    name: 'downSearch',
    data() {
      return {
        selectedValuekey: '',
        content: '',
        selectValues:[]
      }
    },
    computed: {
      selectedValuevalue() {
        for (let i = 0; i < this.selectValues.length; i++) {
          if (this.selectValues[i].key == this.selectedValuekey) {
            return "请输入" + this.selectValues[i].value + "名称(可以空格隔开)"
          }
        }
        return "请先选择一列进行搜索";
      }
    },
    watch:{
      "table":function (newVal,oldVal) {
         if(newVal && newVal !== oldVal)
         {
           if(newVal && newVal.columns) {
             this.selectValues = [];
             newVal.columns.forEach(column => {

               if (column.label == "操作") {
               } else {
                 column.key = column.property;
                 column.value = column.label;

                 this.selectValues.push(column);
               }
             })

             this.selectedValuekey = this.selectValues[0].key;
           }
         }
      }
    },
    methods: {
      searchByCondition() {
        // if(this.selectedValuekey==''){
        //   this.content = '';
        //   this.$message({
        //     message: '请先选择一列进行搜索',
        //     type: 'info'
        //   });
        //   return;
        // }else {
        //   this.$emit("returnedValue", {columnName: this.selectedValuekey, content: this.content});
        // }
        this.$emit("returnedValue", {columnName: this.selectedValuekey, content: this.content});
      }
    }
  }
</script>
<style scoped lang="scss">
  .select-input-value {
    width: 450px;
  }

  .select-input-down {
    width: 150px;
  }

  .select-input-value /deep/ .el-input-group__prepend{
    color: #6e6e6e;
  }

  .select-input-value /deep/ .el-input-group__append {
    background-color: #409FFF;
    color: white;
  }
</style>
