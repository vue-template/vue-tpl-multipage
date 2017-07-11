<template>
  <header>
    <h2>{{msg}}</h2>
    <menu type="context toolbar">
      <li><a href="./index.html">首页</a></li>
      <li><a href="./about.html">关于</a></li>
    </menu>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Header'
      }
    }
  }
</script>

<style scoped>
  header {
    color: black;
  }
</style>