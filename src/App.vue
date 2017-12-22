<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { common } from '~/api'
  export default {

    mounted() {
      /*
      common.areaList().then(res => {
        localStorage.setItem('arealist', JSON.stringify(res.data.data) )
      })
      */
    }
  }
</script>

<style lang="less">
  *{
    margin: 0;
    padding:0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  html, body, #app{
    width: 100%;
    height:100%;
  }

  .el-message-box {
    max-width: 100%;
  }

  .el-submenu .el-menu-item {
    min-width: auto;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px;
    .el-form-item {
      margin-bottom: 10px;
    }
  }

</style>
