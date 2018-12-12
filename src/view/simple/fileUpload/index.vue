<template>
  <el-card>
    <div>
   <!-- <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>-->
        <el-upload
          class="avatar-uploader"
          action=""
          :disabled="!flag"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="change"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i class="el-icon-plus avatar-uploader-icon" v-else-if="flag"></i>
          <i class="el-icon-picture-outline avatar-uploader-icon" v-else></i>
        </el-upload>
  </div>
  </el-card>

</template>

<script>
  import {fileService} from './fileService'

  export default {
        name: "file",
       data() {
      return {
        imageUrl: '',
        file:'',
        flag:true,
        listValue: [],
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        debugger
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        debugger
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$notify.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      change(file) {
        debugger
        this.file=file
        this.imageUrl=file.url
        fileService.saveFile({name:'11',associateFormId:1,associateFormName:'111'},[file.raw]).then(
          res => {
           debugger
          }
        )
      /*  Ge.GE0001A03([file.raw]).then(res => {
         /!* this.$emit('onImgUrl', res.data.data.url)
          this.listValue.avatar = res.data.data.url*!/
        })*/
      },
     /* handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }*/
    }
    }
</script>

<style scoped>
 .avatar-uploader {
    width: 128px;
    height: 128px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
</style>
