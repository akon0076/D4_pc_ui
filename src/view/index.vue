<template>
  <div >
    欢迎登陆: <h3>{{userInfo.userName}}</h3> {{new Date()}}
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        visible: false,
        data: []
      }
    },
    computed: mapState({
      userInfo: state => state.user.userInfo
    }),
    methods: {
      open() {
        this.visible = true;
      },
      handleClose() {
        this.visible = false;
      },
    },
    watch: {
      data(val) {
        console.log(val);
      }
    }
  }
</script>
