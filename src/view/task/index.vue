<template>
  <el-card class="box-card">
    <router-view />
  </el-card>


</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: auto;
  }
</style>
