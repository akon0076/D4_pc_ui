<template>
  <div style="display:inline">
    <el-select v-model="selectedValuekey" class="select-input-down"
               placeholder="请选择查询列"
               clearable
    >
      <el-option
        v-for="item in selectValues"
        :key="item.key"
        :label="item.value"
        :value="item.key"
      >
      </el-option>
    </el-select>
    <el-input @keyup.enter.native="searchByCondition" clearable  @clear="searchByCondition" v-model="content" class="select-input-value" :placeholder="placeholder||selectedValuevalue" ></el-input>
    <el-button  type="primary" class="select-input-search-btn"  @click="searchByCondition">搜索</el-button>
  </div>
</template>
<script>
  export default{
    props:['selectValues',"placeholder"],
    name:'downSearch',
    data(){
      return{
          selectedValuekey:'',
        content:''
      }
    },
    computed:{
      selectedValuevalue(){
        for(let i=0;i<this.selectValues.length;i++){
          if(this.selectValues[i].key==this.selectedValuekey){
            return "请输入"+this.selectValues[i].value+"名称(可以空格隔开)"
          }
        }
        return "请选择一列进行搜索";
      }
    },
    methods:{
      searchByCondition(){
            this.$emit("returnedValue", {columnName: this.selectedValuekey, content: this.content});
      }
    }
  }
</script>
<style scoped lang="scss">
.select-input-value{
  width:300px;
}
  .select-input-down{
    width:160px;
  }
</style>
