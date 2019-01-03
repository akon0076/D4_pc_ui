
<template>
    <div>
      <div>{{ testMes }} </div>

      <button id="testBtn" v-on:click="tellMe()">Test button</button>

    </div>

</template>


<script>
  import $ from 'jquery'

  export default {
      data() {
          return {
            testMes: "测试数据，统计报表展示"
          }
      },


      // 此处写jquery，相当于析构函数，在解析往dom后调用
      mounted: function(){
      },


      // 在method中可以写jquery
      methods: {
        alertMes(message) {
          alert("This is alert mes" + message)
        },
        tellMe() {
          let test = $('#testBtn').text()
          this.alertMes(test)
        }
      }



  }
</script>

<style scoped lang="scss">

</style>
