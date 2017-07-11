<template>
  <h1>{{msg}}<span>test</span></h1>
</template>

<script>
  export default {
    data() {
      return {
        msg: '首页'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  h1 {
    color: pink;
    span {
      margin-left: 5px;
      color: rgb(5, 110, 234);
    }
  }
</style>