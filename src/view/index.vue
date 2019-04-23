<template>
  <div >
    <!--根据自己的需求进行更改,只是搞起好玩的-->
    <div style="    position: absolute;
    color: black">
      欢迎登陆: <h3>{{userInfo.userName}}</h3> {{new Date()}}
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        src:"008",
        visible: false,
        data: []
      }
    },
    computed: mapState({
      userInfo: state => state.user.userInfo
    }),
    methods: {
      changeLogo(){
        const timer=setInterval(()=>{
        var i=1+Math.trunc(Math.random()*9);
         this.src="00"+i;
        },5000);
        this.$once('hook:beforeDestroy', () => {
          clearInterval(timer);
        })
      },
      open() {
        this.visible = true;
      },
      handleClose() {
        this.visible = false;
      },
    },
    created(){
    },
    watch: {
      data(val) {
        console.log(val);
      }
    }
  }
</script>
